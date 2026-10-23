export class NewAppRequest {
    data: NewAppRequestData = new NewAppRequestData();
}

export class NewAppRequestData {
    url: string = "";
    name: string = "";
    description: string = "";
    images: Image[] = [];
}

export class Image {
    url: string = "";
    type: string = "";
}