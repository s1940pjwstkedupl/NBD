
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
  // Zadanie 3
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
    class Osoba (val imie : String, val nazwisko : String, val podatek : Double);
    trait Student {
      val podatek = 0.0;
    }
    trait Pracownik {
      private var _pensja : Double = 0.0;
      def pensja = _pensja;
      def pensja_= (v : Double) : Unit = _pensja = v;
      def podatek = 0.2;
    };
    trait Nauczyciel extends Pracownik {
      override def podatek = 0.1;
    }
    def zad5 = {
      def test(o : Osoba) : Unit = println("Podatek dla " + o.imie + " " + o.nazwisko + " wynosi: " + o.podatek);
      // Wszystko super, tylko jest jeden problem. w zadaniu jest napisane, że Osoba ma mieć podatek, a cała reszta ma go
      // przesłaniać. I ekstra, tylko nie można w traicie przesłonić czegoś, czego jeszcze nie było, więc wydaje się, że nie
      // można tego zrobić inaczej niż tylko przez przedefiniowanie w nowej klasie (anonimowej w poniższym przypadku)
      // tej samej metody po raz kolejny. Nie brzmi to, jakby miało sens, ale może tak ma być
      //test(new Osoba("Student", "S", 3.0) with Student);
    }
    zad5;
  };
}
