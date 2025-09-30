export interface CategoryDetails {
    data: Data;
}

export interface Data {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}