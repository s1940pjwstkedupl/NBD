import scala.annotation.tailrec

object Main extends App {
  val dni : List[String] = "Poniedziałek" :: "Wtorek" :: "Środa" :: "Czwartek" :: "Piątek" :: "Sobota" :: "Niedziela" :: Nil;
  val prods = Map( "a" -> 10, "b" -> 20, "c" -> 30);
  // Zadanie 1a. Pętla for jest, więc problemu chyba nie ma problemu
  def join1a(dni : List[String]) : String = {
    var resultFor = dni.head;
    for (d <- dni.tail) { resultFor += ", " + d; }
    resultFor;
  }
  // Zadanie 1b. Pętla for, tylko dni zaczynające się na P
  // metoda mało zaprzątająca głowę, najpierw filtrujemy listę a potem robimy to samo co wyżej
  def join1bm1(dni : List[String]) : String = {
    val dniNaP = dni.filter(_.startsWith("P"));
    var resultFor = dniNaP.head
    for (d <- dniNaP.tail) { resultFor += ", " + d; }
    resultFor;
  }
  // teraz metoda prawdopodobnie bardziej zgodna z tym, co było zamierzone:
  def join1bm2(dni : List[String]) : String = {
    var resultFor = "";
    for (d <- dni if d.startsWith("P")) { resultFor += ", " + d; }
    // "klasyczne" wycięcie pierwszego przecinka
    resultFor.substring(2);
  }

  // Zadanie 1c:  użycie pętli while. Użycie kombinowane jak w pozostałych przypadkach
  def join1c(dni : List[String]) : String = {
    var hd::tl = dni;
    var result = hd;
    while (!tl.isEmpty) {
      result += ", " + tl.head
      tl = tl.tail
    }
    result;
  }
  // Zadanie 2a, rekurencja
  def join2a(lst : List[String]) : String = lst match {
    case Nil => "";
    case hd :: Nil => hd;
    case hd :: tail => hd + ", " + join2a(tail);
  }
  // Zadanie 2b, rekurencja metodą radz. ucz. Odtylcowa
  def join(lst : List[String]) : String = lst match {
    case Nil => "";
    case hd :: Nil => hd;
    case hd :: tail => join(tail) + ", " + hd;
  }
  // Zadanie 3 tail-rec
  @tailrec def join3(acc : String, lst : List[String]) : String = lst match {
    case Nil => "";
    case hd :: Nil => acc + ", " + hd;
    case hd :: tail => join3(acc + ", " + hd, tail);
  }
  // można też oczywiście zamknąć wszystko w funkcji i dać:
  def join3a(lst : List[String]) : String = lst match {
    case Nil => "";
    case hd :: Nil => hd;
    case hd :: tail => join3(hd, tail);
  }
  // zadanie 4: foldl, foldr
  def join4a(dni : List[String]) : String = dni.tail.foldLeft(dni.head)((l, r) => l + ", " + r); 
  def join4b(dni : List[String]) : String = dni.init.foldRight(dni.last)((l, r) => l + ", " + r);
  // join4a po filtrowanej liście, mam nadzieję, że to przechodzi
  def join4c(dni : List[String]) : String = join4a(dni.filter({_.startsWith("P")}));
  //Zadanie 5, mapowanie ze zmniejszeniem ceny o 10%
  def map5(m : Map[String, Int]) : Map[String, Int] = prods.map(t => (t._1, (t._2 * 0.9).toInt));
  // Zadanie 6 : prezentacja tuple3 - czemu tuple3 a nie tuple i sam se wykryje, tego nie wiem
  def tup6[A, B, C](t : Tuple3[A, B, C]) : () = println(t._1 + ", " + t._2 + ", " + t._3);
  // Zadanie 7 - prezetnacja jak działa Option czy raczej czy wiem jak działa option
  // funkcja przyjmuję listę[Any] i zwraca sumę zwartych w niej integerów, o ile takie istnieją.
  // jezeli nie istnieją zwracane jest None, w przeciwnym wypadku Some[Int]
  def zad7(l : List[Any]) : Option[Int] = {
    val ints = l.map( (t : Any) => t match {
      case t: Int => Some(t);
      case _ => None
    }).flatten
    if (ints.isEmpty ) None else Some(ints.foldLeft(0)((l, r) => l + r))
  }
  // Zadanie 8 - usunięcie zer z listy z zastosowaniem rekurencji
  def zad8(l : List[Int]) : List[Int] = {
    def zad8helper(acc : List[Int], l : List[Int]) : List[Int] = l match {
      case 0 :: tail => zad8helper(acc, tail);
      case v :: tail => zad8helper(v :: acc, tail);
      case Nil => acc;
    }
    zad8helper(Nil, l).reverse
  }
  // Zadanie 9 - zwiększenie o 1
  def zad9(l : List[Int]) : List[Int] = l map (1 + _)
  def zad10(l : List[Double]) : List[Double] = l.filter( x => x >= -5 && x <= 12).map(_.abs)
  def zad10a(l : List[Double]) : List[Double] = l.filter(_ >= -5).filter(_ <= 12).map(_.abs)

  println("Zadanie 1a:\n" + join1a(dni));
  println("Zadanie 1b, metoda 1:\n" + join1bm1(dni));
  println("Zadanie 1b, metoda 2:\n" + join1bm2(dni));
  println("Zadanie 1c:\n" + join1c(dni));
  println("Zadanie 2a:\n" + join2a(dni));
  println("Zadanie 2b:\n" + join(dni));
  println("Zadanie 3:\n" + join3(dni.head, dni.tail));
  println("Zadanie 3, może ładniej:\n" + join3a(dni));
  println("Zadanie 4a (foldl):\n" + join4a(dni));
  println("Zadanie 4b (foldr):\n" + join4b(dni));
  println("Zadanie 4c (foldl):\n" + join4c(dni));
  println("Zadanie 5:\n" + map5(prods));
  println("Poniżej pattern się rozjeżdża, ponieważ funkcja tup6 sama wypisuje swoje wyniki, więc:");
  println("Zadanie 6:");
  tup6(Tuple3("String", 10, 1.0));
  tup6(Tuple3(1.0, "String", 10));
  println("Zadanie 7Some:\n" + zad7(3 :: "a" :: "b" :: 1 :: 2 :: Nil));
  println("Zadanie 7None:\n" + zad7("a" :: "a" :: "b" :: 1.0 :: 2.0 :: Nil));
  println("Zadanie 8:\n" + zad8(0 :: 1 :: 2 :: 0 :: 3 :: 4 :: 0 :: Nil));
  println("Zadanie 9:\n" + zad9(0 :: 1 :: 2 :: 0 :: 3 :: 4 :: 0 :: Nil));
  println("Zadanie 10:\n" + zad10(0.0 :: -1.0 :: 2.0 :: -3.0 :: 4.0 :: -5.0 :: 6.0 :: -7.0 :: 8.0 :: -9.0 :: 10.0 :: -11.0 :: 12.0 :: -13.0 :: 14.0 :: Nil));
}
