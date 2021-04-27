import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', ()=> {
  it('should display weak if strenth is less then 10', () => {
    let pipe = new StrengthPipe();
    
    expect(pipe.transform(8.99)).toEqual('8.99 (weak)');
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });
  it('should display strong if strenth is bigger or equal than 10 and less than 20', () => {
    let pipe = new StrengthPipe();
    
    expect(pipe.transform(10)).toEqual('10 (strong)');
    expect(pipe.transform(19.9)).toEqual('19.9 (strong)');
  });

  it('should display unbelievable if strenth is bigger or equal than 20', () => {
    let pipe = new StrengthPipe();
    
    expect(pipe.transform(20)).toEqual('20 (unbelievable)');
    expect(pipe.transform(40)).toEqual('40 (unbelievable)');
  });
});