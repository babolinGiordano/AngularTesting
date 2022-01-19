describe('my first test', () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should be true if true', () => {
    // arrange inizializzazione dei dati di test
    sut.a = false;

    // act esecuzione del codice da testare
    sut.a = true;

    // assert verifica di cosa ci si aspetta
    expect(sut.a).toBe(true);
  });

});
