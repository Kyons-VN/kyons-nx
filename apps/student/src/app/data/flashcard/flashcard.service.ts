import { Injectable } from '@angular/core';
import { TestContent } from '@share-utils/data';
import congThucDaoHamCoBan from './sample/cong-thuc-dao-ham-co-ban.json';
import congThucLogarit from './sample/cong-thuc-logarit.json';
import congThucNguyenHamCoBan from './sample/cong-thuc-nguyen-ham-co-ban.json';
import dienTichHinhPhang from './sample/dien-tich-hinh-phang.json';
import theTichHinhTru from './sample/the-tich-hinh-tru.json';
import theTichKhoiCau from './sample/the-tich-khoi-cau.json';
import theTichKhoiTru from './sample/the-tich-khoi-tru.json';
import tongNCapSoCong from './sample/tong-n-cap-so-cong.json';
import tongNCapSoNhan from './sample/tong-n-cap-so-nhan.json';
import xacSuat from './sample/xac-suat.json';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  getFlashcard(id: string) {
    let dataObject = {};
    switch (id) {
      case 'cong-thuc-logarit':
        dataObject = congThucLogarit;
        break;
      case 'cong-thuc-dao-ham-co-ban':
        dataObject = congThucDaoHamCoBan;
        break;
      case 'cong-thuc-nguyen-ham-co-ban':
        dataObject = congThucNguyenHamCoBan;
        break;
      case 'dien-tich-hinh-phang':
        dataObject = dienTichHinhPhang;
        break;
      case 'the-tich-khoi-tru':
        dataObject = theTichKhoiTru;
        break;
      case 'xac-suat':
        dataObject = xacSuat;
        break;
      case 'tong-n-cap-so-cong':
        dataObject = tongNCapSoCong;
        break;
      case 'tong-n-cap-so-nhan':
        dataObject = tongNCapSoNhan;
        break;
      case 'the-tich-hinh-tru':
        dataObject = theTichHinhTru;
        break;
      case 'the-tich-khoi-cau':
        dataObject = theTichKhoiCau;
        break;
    }
    return TestContent.fromJson(dataObject);
  }
}
