export class File
{
  public id: string;
  public fileName: string;
  public originalName: string;
  public path: string;
  public mimeType: string;
  public size: number;
  public isPublic: boolean;
  public url?: string;

  constructor(
    id: string,
    fileName: string,
    originalName: string,
    path: string,
    mimeType: string,
    size: number,
    isPublic: boolean,
    url?: string
  )
  {
    this.id = id;
    this.fileName = fileName;
    this.originalName = originalName;
    this.path = path;
    this.mimeType = mimeType;
    this.size = size;
    this.isPublic = isPublic;
    this.url = url;
  }
}
