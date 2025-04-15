import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { config } from '../config/env.js'

class App {
  public app: FastifyInstance
  public app_domain: string = config.app.domain
  public app_port: number = config.app.port

  constructor(appInit: { plugins: any; routes: any }) {
    this.app = fastify({
      logger: {
        level: config.nodeEnv === 'development' ? 'debug' : 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            colorize: true,
            ignore: 'pid,hostname',
            levelFirst: true,
            messageFormat: '{msg} {reqId} {req.method} {req.url}',
            errorLikeObjectKeys: ['err', 'error']
          }
        }
      }
    });

    this.app.addHook('preHandler', (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body')
      }
      done()
    });

    this.register(appInit.plugins);
    this.routes(appInit.routes);
  }

  private register(plugins: { forEach: (arg0: (plugin: any) => void) => void }) {
    plugins.forEach((plugin) => {
      this.app.register(plugin)
    })
  }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      const router = new route()
      this.app.register(router.routes, { prefix: router.prefix_route })
    })
  }

  public listen() {
    this.app.listen({
        port: this.app_port,
        host: this.app_domain
    }, (err) => {
      if (err) {
        this.app.log.fatal({ msg: `Application startup error`, err })
        process.exit(1)
      }

      console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🚀`)
    })
  }
}

export default App