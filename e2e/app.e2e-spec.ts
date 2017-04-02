import { TrustdemocracyClientPage } from './app.po';

describe('trustdemocracy-client App', () => {
  let page: TrustdemocracyClientPage;

  beforeEach(() => {
    page = new TrustdemocracyClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
