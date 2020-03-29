export class Item {

    /** ID */
    id: string;

    /** the Parent ID  */
    parentId: string;

    /** the item name */
    name: string;

    /** the item type (folder | file) */
    folder: boolean;

    /** the creation date of item */
    creation: string;

    /** the modification date of item */
    modification: string;
}
