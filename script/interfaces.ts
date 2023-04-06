interface FrontendConfig {
  ipAddress: string;
  port: string;
}
interface BackendConfig {
  port: string;
}

interface OscConfig {
  ipAddress: string;
  port: string;
}

export interface ConfigVariables {
  frontend: FrontendConfig;
  backend: BackendConfig;
  oscTarget: OscConfig;
}

export interface Host {
  ipAddress: string;
  port: string;
}

export interface NICAddress {
  name?: string;
  ipAddress?: string;
}
