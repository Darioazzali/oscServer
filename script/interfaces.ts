
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

export interface IpReadFromConfigFile {
  ipAddress?: string;
  port: number | string;
}

export type PossiBleEmpyConfigFile = {
  server?: IpReadFromConfigFile;
  oscTarget?: IpReadFromConfigFile;
};

export type PossibleNumericPort= {
  server: Required<IpReadFromConfigFile>
  oscTarget: Required<IpReadFromConfigFile>
}

export interface ConfigFile {
  server: FrontendConfig;
  oscTarget: OscConfig;
}
