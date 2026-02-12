declare module "bun" {
  export function serve(options: any): any;
}

declare module "bun:sqlite" {
  export class Database {
    constructor(path?: string);
    run(sql: string, ...params: any[]): any;
    query(sql: string, ...params: any[]): any;
    prepare(sql: string): any;
  }
  export default Database;
}
