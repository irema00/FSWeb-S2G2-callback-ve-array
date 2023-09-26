const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. */

/*

	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const ikiBinOnDörtFinal = fifaData.filter(
  (match) => match.Year === 2014 && match.Stage === "Final"
);
console.log(ikiBinOnDörtFinal);
//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

console.log("Görev 1a", ikiBinOnDörtFinal[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log("Görev 1b", ikiBinOnDörtFinal[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log("Görev 1c", ikiBinOnDörtFinal[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log("Görev 1d", ikiBinOnDörtFinal[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/

let kazananTakim;
if (
  ikiBinOnDörtFinal[0]["Home Team Goals"] >
  ikiBinOnDörtFinal[0]["Away Team Goals"]
) {
  kazananTakim = ikiBinOnDörtFinal[0]["Home Team Name"];
} else if (
  ikiBinOnDörtFinal[0]["Away Team Goals"] >
  ikiBinOnDörtFinal[0]["Home Team Goals"]
) {
  kazananTakim = ikiBinOnDörtFinal[0]["Away Team Name"];
} else {
  kazananTakim = "Berabere";
}

console.log("Görev 1e", kazananTakim);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
  const Finaller = fifaData.filter((match) => match.Stage === "Final");
  return Finaller;
}

console.log("Görev 2", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
  const finalMaclari = Finaller(fifaData);
  const yillar = finalMaclari.map((match) => match.Year);
  return yillar;
}

console.log("Görev 3 ", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, Finaller) {
  const finalMaclar = Finaller(fifaData);
  const kazananlar = [];

  for (let i = 0; i < finalMaclar.length; i++) {
    const match = finalMaclar[i];
    const homeTeamGoals = match["Home Team Goals"];
    const awayTeamGoals = match["Away Team Goals"];

    if (homeTeamGoals > awayTeamGoals) {
      kazananlar.push(match["Home Team Name"]);
    } else if (homeTeamGoals < awayTeamGoals) {
      kazananlar.push(match["Away Team Name"]);
    }
  }

  return kazananlar;
}

console.log("Görev 4", Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
  const finalMaclar = Finaller(fifaData);
  const yillar = Yillar(fifaData, Finaller);
  const kazananlar = Kazananlar(fifaData, Finaller);
  const yillaraGoreKazanan = [];

  for (let i = 0; i < finalMaclar.length; i++) {
    const yil = yillar[i];
    const kazanan = kazananlar[i];
    const yazi = `${yil} yılında, ${kazanan} dünya kupasını kazandı!`;
    yillaraGoreKazanan.push(yazi);
  }
  return yillaraGoreKazanan;
}

console.log(
  "Görev 5",
  YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  const toplamGoller = Finaller.reduce((accumulator, match) => {
    const evSahibiGol = match["Home Team Goals"];
    const konukTakimGol = match["Away Team Goals"];
    return accumulator + evSahibiGol + konukTakimGol;
  }, 0);

  // Ortalama gol sayısını hesaplayın
  const ortalamaGolSayisi = (toplamGoller / Finaller.length).toFixed(2);

  // 2 ondalık basamağa yuvarlanmış ortalama gol sayısını döndürün
  return ortalamaGolSayisi;
}

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
