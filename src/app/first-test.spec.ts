describe('my first test', () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it('should be true if true', () => {
    // Arrange dove si definisce l'input
    sut.a = false;

    // Act dove si definisce il comportamento da testare
    sut.a = true;

    // Assert dove si definisce cosa mi aspetto
    expect(sut.a).toBe(true);
  });
});
