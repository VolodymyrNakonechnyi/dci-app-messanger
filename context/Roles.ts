type Constructor<T = {}> = new (...args: any[]) => T;

interface RoleObject {
  context?: any;
  [key: string]: any;
}

interface RoleConfig {
  object: RoleObject;
  roles: Constructor[] | Constructor;
}

interface RolesConfig {
  [roleName: string]: RoleConfig;
}

export class RolesManager {
  static applyRoles(target: any, rolesConfig: RolesConfig): void {
    for (const roleName in rolesConfig) {
      if (rolesConfig.hasOwnProperty(roleName)) {
        const config = rolesConfig[roleName];
        const object = config.object;
        const roles = Array.isArray(config.roles) ? config.roles : [config.roles];
        
        // Store reference to object in context
        target[roleName] = object;
        
        // Add reference to context in object
        object.context = target;
        
        // Apply all roles to object
        roles.forEach(Role => {
          const roleInstance = new Role();
          for (const methodName of Object.getOwnPropertyNames(Object.getPrototypeOf(roleInstance))) {
            if (methodName !== 'constructor' && typeof roleInstance[methodName] === 'function') {
              object[methodName] = roleInstance[methodName].bind(object);
            }
          }
        });
      }
    }
  }
}