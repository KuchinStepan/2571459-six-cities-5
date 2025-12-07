export interface ExistsDocumentService {
  exists(id: string): Promise<boolean>;
  findById?(id: string): Promise<unknown>;
}
