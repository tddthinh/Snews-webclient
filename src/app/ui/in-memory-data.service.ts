import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './object/user';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        username: 'administrator',
        password_md5: '12345',
        fullname: 'Trần Đình Đức Thịnh',
        level: 1,
        level_name: 'Quản trị viên'
      },
      {
        id: 2,
        username: 'moderator',
        password_md5: '12345',
        fullname: 'Trần Quốc Toản',
        level: 2,
        level_name: 'Quản lý viên'
      },
      {
        id: 3,
        username: 'user',
        password_md5: '12345',
        fullname: 'Trần Hưng Đạo',
        level: 3,
        level_name: 'Thành viên'
      }
    ];
    const topics = [
      {
        "id": 1000,
        "title": "Vì sao hỏi những câu dốt nát lại là việc thông minh nhất bạn nên làm",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1000.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1001,
        "title": "Nokia, BlackBerry, Palm, Microsoft: Đồng loạt chê bai thậm tệ khi iPhone ra mắt để rồi đều chỉ còn là chiếc bóng của chính mình khi Apple đạt giá trị 1.000 tỷ USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1001.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1002,
        "title": "Giờ là thời khắc tuyệt vời để Apple mua lại Tesla và đá Elon Musk ra khỏi băng ghế lái?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1002.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1003,
        "title": "Honor 8X Max lộ diện với màn hình khổng lồ 7,12 inch, thiết kế giọt nước, giá bán 1.465 USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1003.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1004,
        "title": "Ai là người hưởng lợi nhất trong cuộc đua 'khô máu' trên thị trường thương mại điện tử tỷ đô tại Việt Nam?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1004.html",
        "date": "29/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1005,
        "title": "Vì sao hỏi những câu dốt nát lại là việc thông minh nhất bạn nên làm",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1005.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1006,
        "title": "Nokia, BlackBerry, Palm, Microsoft: Đồng loạt chê bai thậm tệ khi iPhone ra mắt để rồi đều chỉ còn là chiếc bóng của chính mình khi Apple đạt giá trị 1.000 tỷ USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1006.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1007,
        "title": "Honor 8X Max lộ diện với màn hình khổng lồ 7,12 inch, thiết kế giọt nước, giá bán 1.465 USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1007.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1008,
        "title": "Ai là người hưởng lợi nhất trong cuộc đua 'khô máu' trên thị trường thương mại điện tử tỷ đô tại Việt Nam?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1008.html",
        "date": "29/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1009,
        "title": "Vì sao hỏi những câu dốt nát lại là việc thông minh nhất bạn nên làm",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1000.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1010,
        "title": "Nokia, BlackBerry, Palm, Microsoft: Đồng loạt chê bai thậm tệ khi iPhone ra mắt để rồi đều chỉ còn là chiếc bóng của chính mình khi Apple đạt giá trị 1.000 tỷ USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1001.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1011,
        "title": "Giờ là thời khắc tuyệt vời để Apple mua lại Tesla và đá Elon Musk ra khỏi băng ghế lái?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1002.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1012,
        "title": "Honor 8X Max lộ diện với màn hình khổng lồ 7,12 inch, thiết kế giọt nước, giá bán 1.465 USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1003.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1013,
        "title": "Ai là người hưởng lợi nhất trong cuộc đua 'khô máu' trên thị trường thương mại điện tử tỷ đô tại Việt Nam?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1004.html",
        "date": "29/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1014,
        "title": "Giờ là thời khắc tuyệt vời để Apple mua lại Tesla và đá Elon Musk ra khỏi băng ghế lái?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1006.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1015,
        "title": "Giờ là thời khắc tuyệt vời để Apple mua lại Tesla và đá Elon Musk ra khỏi băng ghế lái?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1006.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1016,
        "title": "Vì sao hỏi những câu dốt nát lại là việc thông minh nhất bạn nên làm",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1000.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1017,
        "title": "Nokia, BlackBerry, Palm, Microsoft: Đồng loạt chê bai thậm tệ khi iPhone ra mắt để rồi đều chỉ còn là chiếc bóng của chính mình khi Apple đạt giá trị 1.000 tỷ USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1001.html",
        "date": "27/08/2018",
        "author": "Administrator"
      },
      {
        "id": 1018,
        "title": "Giờ là thời khắc tuyệt vời để Apple mua lại Tesla và đá Elon Musk ra khỏi băng ghế lái?",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1002.html",
        "date": "28/08/2018",
        "author": "Admin"
      },
      {
        "id": 1019,
        "title": "Honor 8X Max lộ diện với màn hình khổng lồ 7,12 inch, thiết kế giọt nước, giá bán 1.465 USD",
        "link": "file:///D:/Users/THINH/Documents/Mon%20Hoc/LuanVan/topics/1003.html",
        "date": "28/08/2018",
        "author": "Admin"
      }
    ]
    return { users };
  }

  constructor() { }
}
