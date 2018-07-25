import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Response, RequestOptions, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';

import { DataService } from './data.service';
import { ErrorsService } from './errors.service';

@Injectable()
export class AnalyticsService {

  constructor(private authHttp: AuthHttp, private dataService: DataService,
    private errorsService: ErrorsService) { }

  public getSubgroupList(id:number): void {
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    this.authHttp.get(`${this.dataService.API_ANALYTICS_URL}/encampment/stake/ward/${id}`, options)
    .subscribe(res => {
      const fileName = this.getFileNameFromResponseContentDisposition(res);
      this.saveFile(res.blob(), fileName);
    });
  }

  public getGroupListByAge(id:number): void {
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    this.authHttp.get(`${this.dataService.API_ANALYTICS_URL}/encampment/stake/${id}`, options)
    .subscribe(res => {
      const fileName = this.getFileNameFromResponseContentDisposition(res);
      this.saveFile(res.blob(), fileName);
    });
  }

  public getGroupListByDay(id:number): void {
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    this.authHttp.get(`${this.dataService.API_ANALYTICS_URL}/encampment/stake/${id}/day`, options)
    .subscribe(res => {
      const fileName = this.getFileNameFromResponseContentDisposition(res);
      this.saveFile(res.blob(), fileName);
    });
  }

  public getGroupCostsByWard(id:number): void {
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    this.authHttp.get(`${this.dataService.API_ANALYTICS_URL}/encampment/stake/${id}/cost`, options)
    .subscribe(res => {
      const fileName = this.getFileNameFromResponseContentDisposition(res);
      this.saveFile(res.blob(), fileName);
    });
  }

  /**
   * Saves a file by opening file-save-as dialog in the browser
   * using file-save library.
   * @param blobContent file content as a Blob
   * @param fileName name file should be saved as
   */
  private saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  /**
  * Derives file name from the http response
  * by looking inside content-disposition
  * @param res http Response
  */
  private getFileNameFromResponseContentDisposition = (res: Response) => {

    // return "test.csv";
    const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    let fileName = (matches[1] || 'untitled').trim();
    fileName = fileName.replace(/"/g,'');
    return fileName;
  };

}
