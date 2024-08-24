import { Category } from "src/enum/room.enums";

export const roomImages: { [key in Category]: string[] } = {
    [Category.SUITE]: [
      'https://www.google.com/imgres?q=suites%20standard&imgurl=https%3A%2F%2Fassets.milestoneinternet.com%2Fcdn-cgi%2Fimage%2Ff%3Dauto%2Fhighgate-hotels%2Fnau-hotels%2Fsiteimages%2Fnau-salgados-dunas-suites-standard-double-room-with-balcony-view.jpg%3Fwidth%3D600%26height%3D600&imgrefurl=https%3A%2F%2Fwww.nauhotels.com%2Fes%2Fnau-salgados-dunas-suites%2Faccommodations&docid=PbohZT_TI8cByM&tbnid=cGudu6UfL55mUM&vet=12ahUKEwiplpPhlY6IAxXnrJUCHV7lAM8QM3oECFIQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwiplpPhlY6IAxXnrJUCHV7lAM8QM3oECFIQAA',
      
    ],
    [Category.SUITE_PREMIUM]: [
      'https://www.google.com/imgres?q=luxury%20suites&imgurl=https%3A%2F%2Fwww.athinasuites.com%2Fimages%2FHomepage_Resort_INDEX%2Fdeluxe-suite.jpg&imgrefurl=https%3A%2F%2Fwww.athinasuites.com%2F&docid=GPgIBSnXzsP26M&tbnid=tVCORRLMEhs6wM&vet=12ahUKEwipyZO7lY6IAxUUqJUCHTOqI8MQM3oECC4QAA..i&w=443&h=460&hcb=2&ved=2ahUKEwipyZO7lY6IAxUUqJUCHTOqI8MQM3oECC4QAA',
      
    ],
    [Category.LOFT]: [
      'https://www.lamasu.it/public/prodotti/378/1__40M0554.jpg',
      
    ],
    [Category.LOFT_PREMIUM]: [
      'https://stock.adobe.com/es/images/modern-luxury-beach-loft-apartment-with-sea-view/42365903',
      'https://stock.adobe.com/es/images/modern-luxury-beach-loft-apartment-with-sea-view/42523787',
      'https://stock.adobe.com/es/images/modern-luxury-beach-loft-apartment-with-sea-view/43093607',
      
    ],
  };