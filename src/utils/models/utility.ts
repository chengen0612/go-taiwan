export type MemberOf<T> = T extends Array<infer Item> ? Item : never;
