import { Permissions as BasePermissions } from "../appBase/interfaces";

export interface LinkInterface { id?: number, churchId: number, category: string, url?: string, text: string, sort: number, linkType: string, linkData: string, icon: string }
export interface PageInterface { id?: number, churchId?: number, name?: string, lastModified?: Date, content?: string }

export class Permissions extends BasePermissions {
    static b1Api = {
        settings: {
            edit: { api: "B1Api", contentType: "Settings", action: "Edit" }
        }
    };
}