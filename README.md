Clasa KM:
-genereaza cheia secreta
-o cripteaza cu cheia pe care o stiu si A si B

NodeA:
-cere cheia de la KM
-decripteaza cheia
-citeste textul din fisier
-cripteaza textul pe blocuri

NodeB:
-cere cheia de la A (pe care A o are de la KM criptata)
-decripteaza cheia
-primeste textul criptat pe blocuri
-decripteaza blocurile pe rand si afiseaza
