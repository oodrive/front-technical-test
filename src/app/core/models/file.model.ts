export interface File {
    id: string;
    name: string;
    folder: boolean;
    creation: string | Date;
    modification: string | Date;
    parentId?: string;
    description?: string;
}
