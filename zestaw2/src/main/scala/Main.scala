
object Main extends App {
  val dni : List[String] = "Poniedziałek" :: "Wtorek" :: "Środa" :: "Czwartek" :: "Piątek" :: "Sobota" :: "Niedziela" :: Nil;
  // Zadanie 1 (pon-pią -> "praca", sob/nie -> "weekend", _ -> "nie ma takiego dnia"
  def zad1(day : String) : String = day match {
    case "Poniedziałek" | "Wtorek" | "Środa" | "Czwartek" | "Piątek" => "Praca";
    case "Sobota" | "Niedziela" => "Weekend" ;
    case _ => "Nie ma takiego dnia";
  }
  println("Zadanie 1: Poniedziałek: " + zad1("Poniedziałek"));
  println("Zadanie 1: Sobota: " + zad1("Sobota"));
  println("Zadanie 1: Zadanie: " + zad1("Zadanie"));
  // Zadanie 2
  class KontoBankowe (private var stanKonta : Double) {
    def this() = this(0);
    
    def wplata(amt : Double) : Unit = stanKonta += amt;
    def wyplata(amt : Double) : Unit = stanKonta -= amt;
    def getStanKonta = stanKonta;
  }
  def zad2 = {
    println("\nZadanie 2:\nKonta bankowe\n");
    var k1 = new KontoBankowe(0.0);
    var k2 = new KontoBankowe(100.0);
    println("k1: stan: " + k1.getStanKonta);
    println("k1: wplata: 5.0");
    k1.wplata(5.0);
    println("k1: stan: " + k1.getStanKonta);
    println("k1: wyplata: 3.0");
    k1.wyplata(3.0);
    println("k1: stan: " + k1.getStanKonta);
    println("k2: stan: " + k2.getStanKonta);
    println("k2: wplata: 30.0");
    k2.wplata(30.0);
    println("k2: stan: " + k2.getStanKonta);
    println("k2: wyplata: myyyliard talarów");
    k2.wyplata(1_000_000_000.0)
    println("k2: stan: " + k2.getStanKonta);
  }
  zad2;
  {
  // Zadanie 3 - FIXME: jako case class !  // FIXME: albo i nie.
  class Osoba (val imie: String, val nazwisko : String);
  def helloOsoba(o : Osoba) = (o.imie, o.nazwisko) match {
    case ("Adam", "A") => "Witaj, Janie A!";
    case ("Beata", "B") => "Witaj, Beato B!";
    case ("Cedryk", "C") => "Cedr - libańskie drzewo!";
    case (_, _) => "Cześć.";
  }
  def zad3 = {
    println("\nZadanie 3:\n");
    println(helloOsoba(new Osoba("Adam", "A")));
    println(helloOsoba(new Osoba("Cedryk", "C")));
    println(helloOsoba(new Osoba("Diana", "D")));
    println(helloOsoba(new Osoba("Beata", "J")));
  }
  zad3;
  }
  {
    // Zadanie 4
    def intAndFunc(i: Int, f : Int => Int) = f(f(f(i)))
    def zad4 = {
      println("\nZadanie 4:\n");
      println(intAndFunc(1, 1+_));
      println(intAndFunc(2, x => x * x));
      println(intAndFunc(256, _ / 2));
    };
    zad4;
  };
  {
    trait Opodatkowany {
      def podatek : Double;
    };
    abstract class Osoba (val imie : String, val nazwisko : String) extends Opodatkowany {
    };
    trait Student extends Opodatkowany {
      override def podatek = 0.0;
    }
    trait Pracownik extends Opodatkowany {
      private var _pensja : Double = 0.0;
      def pensja = _pensja;
      def pensja_= (v : Double) : Unit = _pensja = v;
      override def podatek = 0.2;
    };
    trait Nauczyciel extends Pracownik {
      override def podatek = 0.1;
    }
    def zad5 = {
      def test(o : Osoba) : Unit = println("Podatek dla " + o.imie + " " + o.nazwisko + " wynosi: " + o.podatek);
      test(new Osoba("Student", "S") with Student);
      test(new Osoba("Pracownik", "P") with Pracownik);
      test(new Osoba("Nauczyciel", "N") with Nauczyciel); 
      test(new Osoba("StudPrac", "SP") with Student with Pracownik); // minusy studiowania w czasie pracy
      test(new Osoba("PracStud", "PS") with Pracownik with Student); // bonusy pracy na studiach
      test(new Osoba("NauStud", "NS") with Nauczyciel with Student); // Student nadpisał Mistrza
      test(new Osoba("StudNaucz", "SN") with Student with Nauczyciel); // Nauczyciel nadpisał studenta
      test(new Osoba("Mutant1", "M1") with Student with Nauczyciel with Pracownik); // zwraca 0.1 prawdopodobnie dlatego, że trait Pracownik jest w tym przypadku ciężko nadmiarowy - jset nadpisywany przez Nauczyciela
      test(new Osoba("Mutant2", "M2") with Nauczyciel with Pracownik with Student); // a tutaj jest ok, Student jako ostatni nadpisuje wszystko wcześniej.
      test(new Osoba("Mutant3", "M3") with Pracownik with Student with Nauczyciel);
    }
    zad5;
  };
}

