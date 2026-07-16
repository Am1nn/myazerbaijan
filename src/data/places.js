const officialOldCitySource =
  "https://icherisheher.gov.az/en/monuments/category/olke-ehemiyyetli-abideler";

const bakuTourismSource =
  "https://azerbaijan.travel/take-a-walking-tour-of-bakus-oil-boom-architecture";

const absheronSource = "https://azerbaijan.travel/heritage-sites";

// Mapbox coordinate order: [longitude, latitude]
const verifiedCoordinates = Object.freeze({
  1: [49.8372292, 40.3661549],
  2: [49.8331301, 40.3661934],
  3: [50.0085975, 40.4154343],
  4: [49.38113, 40.10997],
  5: [49.835163, 40.366196],
  6: [49.8346702, 40.3653885],
  7: [49.8356458, 40.3653969],
  8: [49.8372893, 40.3669508],
  9: [49.8368757, 40.3667459],
  10: [49.83629, 40.36876],
  11: [49.8367, 40.3681],
  12: [49.834244, 40.363746],
  13: [49.836944, 40.368611],
  14: [49.836667, 40.365556],
  15: [49.835837, 40.365064],
  16: [49.8327957, 40.3643166],
  17: [49.836667, 40.366389],
  18: [49.835719, 40.365394],
  19: [49.836691, 40.3663585],
  20: [49.836581, 40.366872],
  21: [49.832812, 40.3669],
  22: [49.832867, 40.3648],
  23: [49.834332, 40.364799],
  24: [49.835475, 40.367728],
  25: [49.8342941, 40.3679127],
  26: [49.835589, 40.368119],
  27: [49.83455, 40.364681],
  28: [49.832575, 40.365971],
  29: [49.8335313, 40.3658741],
  30: [49.833858, 40.366072],
  31: [49.9799046, 40.4561593],
  32: [50.169547, 40.439686],
  33: [50.140593, 40.4921351],
  34: [50.1471048, 40.4957271],
  35: [50.0047879, 40.5614515],
  36: [49.8728, 40.3837],
  37: [49.840103, 40.369423],
  38: [49.8317, 40.368714],
  39: [49.8337235, 40.3685373],
  40: [49.831636, 40.366839],
  41: [49.831739, 40.364071],
  42: [49.8476511, 40.3771548],
  43: [49.828786, 40.372056],
  44: [49.8202995, 40.3086644],
  45: [49.850439, 40.380178],
});

const getVerifiedCoordinates = (id, fallbackCoordinates) =>
  verifiedCoordinates[id] ?? fallbackCoordinates;

const bakuHistoricPlace = ({
  id,
  slug,
  coordinates,
  name,
  city,
  period,
  shortDescription,
  description,
  source = officialOldCitySource,
}) => ({
  id,
  slug,
  category: "historical",
  coordinates: getVerifiedCoordinates(id, coordinates),
  images: [],
  source,
  name,
  city: city ?? { az: "Bakı", tr: "Bakü", en: "Baku", ru: "Баку" },
  period,
  shortDescription,
  description,
  facts: {
    az: [
      `Dövr: ${period.az}.`,
      "Bakının tarixi-memarlıq irsinin bir hissəsidir.",
      "Ziyarətdən əvvəl giriş rejimini yoxlamaq tövsiyə olunur.",
    ],
    tr: [
      `Dönem: ${period.tr}.`,
      "Bakü'nün tarihî ve mimari mirasının bir parçasıdır.",
      "Ziyaretten önce giriş koşullarını kontrol etmeniz önerilir.",
    ],
    en: [
      `Period: ${period.en}.`,
      "Part of Baku's historical and architectural heritage.",
      "Check current access conditions before visiting.",
    ],
    ru: [
      `Период: ${period.ru}.`,
      "Является частью историко-архитектурного наследия Баку.",
      "Перед посещением рекомендуется уточнить условия доступа.",
    ],
  },
});

const oldCityMonument = ({
  id,
  slug,
  coordinates,
  name,
  period,
  note,
}) =>
  bakuHistoricPlace({
    id,
    slug,
    coordinates,
    name,
    period,
    shortDescription: note,
    description: {
      az: `${note.az} Abidə İçərişəhər Dövlət Tarix-Memarlıq Qoruğunun rəsmi siyahısında qorunan tarixi-memarlıq irsi kimi təqdim olunur.`,
      tr: `${note.tr} Yapı, İçerişehir Devlet Tarih-Mimarlık Koruma Alanı'nın resmî envanterinde korunan tarihî ve mimari miras olarak yer alır.`,
      en: `${note.en} It is listed by the Icherisheher State Historical-Architectural Reserve as protected historical and architectural heritage.`,
      ru: `${note.ru} Объект представлен в официальном перечне Государственного историко-архитектурного заповедника «Ичери-шехер» как охраняемое наследие.`,
    },
  });

const greaterBakuMonument = ({
  id,
  slug,
  coordinates,
  name,
  city,
  period,
  note,
  source = bakuTourismSource,
}) =>
  bakuHistoricPlace({
    id,
    slug,
    coordinates,
    name,
    city,
    period,
    source,
    shortDescription: note,
    description: {
      az: `${note.az} Bu məkan Bakının İçərişəhərdən kənardakı çoxqatlı tarixi və memarlıq irsini təmsil edir.`,
      tr: `${note.tr} Bu mekân, Bakü'nün İçerişehir dışındaki çok katmanlı tarihî ve mimari mirasını temsil eder.`,
      en: `${note.en} The site represents Baku's layered historical and architectural heritage beyond the Old City.`,
      ru: `${note.ru} Объект представляет многослойное историко-архитектурное наследие Баку за пределами Старого города.`,
    },
  });

const placeRecords = [
  {
    id: 1,
    slug: "maiden-tower",
    category: "historical",
    coordinates: getVerifiedCoordinates(1, [49.8372, 40.3667]),
    images: [],
    source: officialOldCitySource,
    name: {
      az: "Qız Qalası",
      en: "Maiden Tower",
      tr: "Kız Kalesi",
      ru: "Девичья башня",
    },
    city: {
      az: "Bakı",
      en: "Baku",
      tr: "Bakü",
      ru: "Баку",
    },
    period: {
      az: "XII əsr",
      en: "12th century",
      tr: "XII. yüzyıl",
      ru: "XII век",
    },
    shortDescription: {
      az: "İçərişəhərdə yerləşən Qız Qalası Bakının ən tanınmış tarixi simvollarından biridir.",
      en: "Located in the Old City, the Maiden Tower is one of Baku’s most recognizable historical landmarks.",
      tr: "İçerişehir'de bulunan Kız Kalesi, Bakü'nün en tanınmış tarihî simgelerinden biridir.",
      ru: "Девичья башня, расположенная в Ичери-шехере, — один из самых узнаваемых исторических символов Баку.",
    },
    description: {
      az: "Qız Qalası İçərişəhərin ən məşhur abidələrindən biridir. Abidənin təyinatı haqqında müxtəlif fikirlər mövcuddur. O, həm müdafiə, həm müşahidə, həm də dini-mədəni əhəmiyyətli tikili kimi dəyərləndirilir.",
      en: "The Maiden Tower is one of the most famous monuments of the Old City. There are different opinions about its original purpose, including defensive, observational, religious and cultural functions.",
      tr: "Kız Kalesi, İçerişehir'in en ünlü yapılarından biridir. İlk kullanım amacı hakkında farklı görüşler vardır; savunma, gözlem, dinî ve kültürel işlevler bunlar arasındadır.",
      ru: "Девичья башня — один из самых известных памятников Ичери-шехера. Существуют разные мнения о её первоначальном назначении, включая оборонительную, наблюдательную, религиозную и культурную функции.",
    },
    facts: {
      az: [
        "İçərişəhər ərazisində yerləşir.",
        "Bakının əsas memarlıq simvollarından biridir.",
        "UNESCO irsi ilə əlaqəli tarixi zonada yerləşir.",
      ],
      en: [
        "Located inside the Old City.",
        "One of Baku’s main architectural symbols.",
        "Located within a historical area connected to UNESCO heritage.",
      ],
      tr: [
        "İçerişehir sınırları içinde yer alır.",
        "Bakü'nün başlıca mimari simgelerinden biridir.",
        "UNESCO mirasıyla bağlantılı tarihî bölgede bulunur.",
      ],
      ru: [
        "Расположена на территории Ичери-шехера.",
        "Один из главных архитектурных символов Баку.",
        "Находится в исторической зоне, связанной со Всемирным наследием ЮНЕСКО.",
      ],
    },
  },
  {
    id: 2,
    slug: "shirvanshahs-palace",
    category: "historical",
    coordinates: getVerifiedCoordinates(2, [49.8339, 40.3662]),
    images: [],
    source: officialOldCitySource,
    name: {
      az: "Şirvanşahlar Sarayı",
      en: "Palace of the Shirvanshahs",
      tr: "Şirvanşahlar Sarayı",
      ru: "Дворец Ширваншахов",
    },
    city: {
      az: "Bakı",
      en: "Baku",
      tr: "Bakü",
      ru: "Баку",
    },
    period: {
      az: "XV əsr",
      en: "15th century",
      tr: "XV. yüzyıl",
      ru: "XV век",
    },
    shortDescription: {
      az: "İçərişəhərdə yerləşən orta əsr saray kompleksidir.",
      en: "A medieval palace complex located in Baku’s Old City.",
      tr: "Bakü'nün İçerişehir bölgesinde bulunan bir Orta Çağ saray kompleksidir.",
      ru: "Средневековый дворцовый комплекс, расположенный в Ичери-шехере в Баку.",
    },
    description: {
      az: "Şirvanşahlar Sarayı Azərbaycan memarlığının ən dəyərli nümunələrindən hesab olunur. Kompleks saray binası, divanxana, türbə, məscid və digər tikililərdən ibarətdir.",
      en: "The Palace of the Shirvanshahs is considered one of the finest examples of Azerbaijani architecture. The complex includes the palace building, divankhana, mausoleum, mosque and other structures.",
      tr: "Şirvanşahlar Sarayı, Azerbaycan mimarisinin en değerli örneklerinden biri kabul edilir. Kompleks; saray binası, divanhane, türbe, cami ve diğer yapılardan oluşur.",
      ru: "Дворец Ширваншахов считается одним из лучших образцов азербайджанской архитектуры. Комплекс включает здание дворца, диванхане, мавзолей, мечеть и другие сооружения.",
    },
    facts: {
      az: [
        "Orta əsr Azərbaycan memarlığının nümunəsidir.",
        "Saray kompleksi bir neçə tikilidən ibarətdir.",
        "İçərişəhərin əsas tarixi məkanlarındandır.",
      ],
      en: [
        "An example of medieval Azerbaijani architecture.",
        "The complex consists of several structures.",
        "One of the main historical sites of the Old City.",
      ],
      tr: [
        "Orta Çağ Azerbaycan mimarisinin bir örneğidir.",
        "Saray kompleksi birkaç yapıdan oluşur.",
        "İçerişehir'in başlıca tarihî mekânlarından biridir.",
      ],
      ru: [
        "Образец средневековой азербайджанской архитектуры.",
        "Дворцовый комплекс состоит из нескольких сооружений.",
        "Одна из главных исторических достопримечательностей Ичери-шехера.",
      ],
    },
  },
  {
    id: 3,
    slug: "ateshgah",
    category: "historical",
    coordinates: getVerifiedCoordinates(3, [50.0089, 40.4153]),
    images: [],
    source: "https://azerbaijan.travel/ateshgah-fire-temple",
    name: {
      az: "Atəşgah",
      en: "Ateshgah Fire Temple",
      tr: "Ateşgâh Ateş Tapınağı",
      ru: "Храм огня Атешгях",
    },
    city: {
      az: "Suraxanı",
      en: "Surakhani",
      tr: "Surahanı",
      ru: "Сураханы",
    },
    period: {
      az: "XVII–XVIII əsrlər",
      en: "17th–18th centuries",
      tr: "XVII–XVIII. yüzyıllar",
      ru: "XVII–XVIII века",
    },
    shortDescription: {
      az: "Bakı yaxınlığında yerləşən tarixi od məbədidir.",
      en: "A historical fire temple located near Baku.",
      tr: "Bakü yakınlarında bulunan tarihî bir ateş tapınağıdır.",
      ru: "Исторический храм огня, расположенный недалеко от Баку.",
    },
    description: {
      az: "Atəşgah od kultu və qədim dini ənənələrlə əlaqələndirilən tarixi məbəddir. Suraxanı ərazisində yerləşən bu kompleks Azərbaycanın mədəni irsində xüsusi yer tutur.",
      en: "Ateshgah is a historical temple associated with fire worship and ancient religious traditions. Located in Surakhani, it holds a special place in Azerbaijan’s cultural heritage.",
      tr: "Ateşgâh, ateş kültü ve kadim dinî geleneklerle ilişkilendirilen tarihî bir tapınaktır. Surahanı'da bulunan kompleks, Azerbaycan'ın kültürel mirasında özel bir yere sahiptir.",
      ru: "Атешгях — исторический храм, связанный с поклонением огню и древними религиозными традициями. Расположенный в Сураханах комплекс занимает особое место в культурном наследии Азербайджана.",
    },
    facts: {
      az: [
        "Od məbədi kimi tanınır.",
        "Suraxanı ərazisində yerləşir.",
        "Tarixi dini-mədəni məkan hesab olunur.",
      ],
      en: [
        "Known as a fire temple.",
        "Located in Surakhani.",
        "Considered a historical religious and cultural site.",
      ],
      tr: [
        "Ateş tapınağı olarak bilinir.",
        "Surahanı bölgesinde yer alır.",
        "Tarihî, dinî ve kültürel bir mekân kabul edilir.",
      ],
      ru: [
        "Известен как храм огня.",
        "Расположен в Сураханах.",
        "Считается историческим религиозным и культурным объектом.",
      ],
    },
  },
  {
    id: 4,
    slug: "gobustan",
    category: "historical",
    coordinates: getVerifiedCoordinates(4, [49.3828, 40.1049]),
    images: [],
    source: "https://whc.unesco.org/en/list/1076",
    name: {
      az: "Qobustan",
      en: "Gobustan",
      tr: "Kobustan",
      ru: "Гобустан",
    },
    city: {
      az: "Qobustan",
      en: "Gobustan",
      tr: "Kobustan",
      ru: "Гобустан",
    },
    period: {
      az: "Qədim dövr",
      en: "Ancient period",
      tr: "Antik dönem",
      ru: "Древний период",
    },
    shortDescription: {
      az: "Qayaüstü rəsmləri ilə məşhur olan qədim tarixi ərazidir.",
      en: "An ancient historical area famous for its rock carvings.",
      tr: "Kaya resimleriyle ünlü antik bir tarihî bölgedir.",
      ru: "Древняя историческая территория, известная своими наскальными рисунками.",
    },
    description: {
      az: "Qobustan qədim insanların həyat tərzini, ov səhnələrini və rituallarını əks etdirən qayaüstü təsvirləri ilə tanınır. Bu ərazi Azərbaycanın ən mühüm arxeoloji məkanlarından biridir.",
      en: "Gobustan is known for rock carvings that reflect ancient human life, hunting scenes and rituals. It is one of Azerbaijan’s most important archaeological sites.",
      tr: "Kobustan, eski insanların yaşamını, av sahnelerini ve ritüellerini yansıtan kaya resimleriyle tanınır. Azerbaycan'ın en önemli arkeolojik alanlarından biridir.",
      ru: "Гобустан известен наскальными рисунками, отражающими жизнь древних людей, сцены охоты и ритуалы. Это один из важнейших археологических памятников Азербайджана.",
    },
    facts: {
      az: [
        "Qayaüstü təsvirlərlə məşhurdur.",
        "Arxeoloji əhəmiyyətə malikdir.",
        "Qədim insan yaşayışının izlərini qoruyur.",
      ],
      en: [
        "Famous for rock carvings.",
        "Has archaeological importance.",
        "Preserves traces of ancient human life.",
      ],
      tr: [
        "Kaya resimleriyle ünlüdür.",
        "Arkeolojik öneme sahiptir.",
        "Eski insan yaşamının izlerini korur.",
      ],
      ru: [
        "Известен наскальными рисунками.",
        "Имеет большое археологическое значение.",
        "Сохраняет следы жизни древних людей.",
      ],
    },
  },
  bakuHistoricPlace({
    id: 5,
    slug: "icherisheher",
    coordinates: [49.8338, 40.3665],
    name: {
      az: "İçərişəhər",
      tr: "İçerişehir",
      en: "Icherisheher (Old City)",
      ru: "Ичери-шехер",
    },
    period: {
      az: "orta əsrlərdən XIX əsrə",
      tr: "Orta Çağ'dan XIX. yüzyıla",
      en: "medieval era to the 19th century",
      ru: "Средневековье — XIX век",
    },
    shortDescription: {
      az: "Bakının qala divarları ilə əhatələnmiş tarixi mərkəzi.",
      tr: "Bakü'nün surlarla çevrili tarihî merkezi.",
      en: "Baku's historic core enclosed by fortress walls.",
      ru: "Историческое ядро Баку, окружённое крепостными стенами.",
    },
    description: {
      az: "İçərişəhər yaşayış məhəllələri, məscidlər, karvansaralar, hamamlar və saray kompleksini birləşdirən canlı şəhər ansamblıdır. Qız Qalası və Şirvanşahlar Sarayı ilə birlikdə 2000-ci ildə UNESCO siyahısına daxil edilib.",
      tr: "İçerişehir; mahalleleri, camileri, kervansarayları, hamamları ve saray kompleksini birleştiren yaşayan bir kent dokusudur. Kız Kalesi ve Şirvanşahlar Sarayı ile birlikte 2000'de UNESCO listesine alındı.",
      en: "Icherisheher is a living urban ensemble of residential quarters, mosques, caravanserais, hammams and a palace complex. It was inscribed by UNESCO in 2000 together with the Maiden Tower and Shirvanshahs' Palace.",
      ru: "Ичери-шехер — живой городской ансамбль с жилыми кварталами, мечетями, караван-сараями, банями и дворцовым комплексом. Вместе с Девичьей башней и Дворцом Ширваншахов он включён в список ЮНЕСКО в 2000 году.",
    },
  }),
  bakuHistoricPlace({
    id: 6,
    slug: "muhammad-mosque",
    coordinates: [49.8347, 40.3658],
    name: {
      az: "Məhəmməd məscidi",
      tr: "Muhammed Camii",
      en: "Muhammad Mosque",
      ru: "Мечеть Мухаммеда",
    },
    period: {
      az: "1078–1079",
      tr: "1078–1079",
      en: "1078–1079",
      ru: "1078–1079",
    },
    shortDescription: {
      az: "İçərişəhərin ən qədim tarixli məscidlərindən biri.",
      tr: "İçerişehir'in tarihi kesin olarak bilinen en eski camilerinden biri.",
      en: "One of the oldest dated mosques in the Old City.",
      ru: "Одна из старейших датированных мечетей Старого города.",
    },
    description: {
      az: "Sınıqqala adı ilə də tanınan məscid ustad Məhəmməd ibn Əbu Bəkr tərəfindən inşa edilib. Minarəsi 1723-cü il hadisələri ilə bağlı Sınıqqala adını daşıyır.",
      tr: "Sınıkkale olarak da bilinen cami, usta Muhammed ibn Ebu Bekir tarafından inşa edildi. Minaresi 1723 olaylarıyla bağlantılı Sınıkkale adıyla anılır.",
      en: "Also known as Siniqqala, the mosque was built by master Muhammad ibn Abu Bakr. Its minaret is associated with the name Siniqqala following the events of 1723.",
      ru: "Мечеть, известная также как Сыныггала, построена мастером Мухаммедом ибн Абу Бакром. Название минарета Сыныггала связано с событиями 1723 года.",
    },
  }),
  bakuHistoricPlace({
    id: 7,
    slug: "juma-mosque-baku",
    coordinates: [49.8353, 40.3666],
    name: {
      az: "Cümə məscidi",
      tr: "Cuma Camii",
      en: "Juma Mosque",
      ru: "Джума-мечеть",
    },
    period: {
      az: "XII əsrdən; hazırkı bina 1899",
      tr: "XII. yüzyıldan; mevcut bina 1899",
      en: "from the 12th century; current building 1899",
      ru: "с XII века; нынешнее здание — 1899",
    },
    shortDescription: {
      az: "İçərişəhərin qədim cümə məscidi ənənəsini davam etdirən ibadət yeri.",
      tr: "İçerişehir'in eski cuma camisi geleneğini sürdüren ibadet yeri.",
      en: "A place of worship continuing the Old City's historic congregational-mosque tradition.",
      ru: "Мечеть, продолжающая древнюю традицию соборной мечети Ичери-шехера.",
    },
    description: {
      az: "Bu sahədə cümə məscidinin fəaliyyəti XII əsrdən sənədləşir. İndiki bina xeyriyyəçi Hacı Şıxəli Dadaşovun vəsaiti ilə 1899-cu ildə daha qədim tikilinin yerində ucaldılıb.",
      tr: "Bu alandaki cuma camisinin geçmişi XII. yüzyıla uzanır. Bugünkü yapı, hayırsever Hacı Şıhali Dadaşov'un desteğiyle 1899'da eski yapının yerinde inşa edildi.",
      en: "A congregational mosque has operated on this site since the 12th century. The present building was erected in 1899 on the site of an older structure with support from philanthropist Haji Shikhali Dadashov.",
      ru: "Соборная мечеть действует на этом месте с XII века. Нынешнее здание возведено в 1899 году на месте более раннего сооружения при поддержке мецената Гаджи Шихали Дадашева.",
    },
  }),
  bakuHistoricPlace({
    id: 8,
    slug: "multani-caravanserai",
    coordinates: [49.8363, 40.3662],
    name: {
      az: "Multanı karvansarası",
      tr: "Multan Kervansarayı",
      en: "Multani Caravanserai",
      ru: "Караван-сарай Мултани",
    },
    period: {
      az: "XIV əsr",
      tr: "XIV. yüzyıl",
      en: "14th century",
      ru: "XIV век",
    },
    shortDescription: {
      az: "Multandan gələn tacirlər üçün istifadə olunmuş karvansara.",
      tr: "Multan'dan gelen tüccarların kullandığı kervansaray.",
      en: "A caravanserai used by merchants arriving from Multan.",
      ru: "Караван-сарай для купцов, прибывавших из Мултана.",
    },
    description: {
      az: "Karvansara Bakının beynəlxalq ticarət yollarındakı rolunu göstərir. Daxili həyət ətrafında qurulan planı orta əsr karvansaralarının funksional quruluşunu qoruyur.",
      tr: "Kervansaray, Bakü'nün uluslararası ticaret yollarındaki rolünü gösterir. İç avlu çevresindeki planı Orta Çağ kervansaray düzenini yansıtır.",
      en: "The caravanserai reflects Baku's role in international trade routes. Its courtyard-centred plan preserves the functional layout of a medieval caravanserai.",
      ru: "Караван-сарай отражает роль Баку на международных торговых путях. Планировка вокруг внутреннего двора сохраняет устройство средневекового постоялого двора.",
    },
  }),
  bakuHistoricPlace({
    id: 9,
    slug: "bukhara-caravanserai",
    coordinates: [49.8361, 40.3664],
    name: {
      az: "Buxara karvansarası",
      tr: "Buhara Kervansarayı",
      en: "Bukhara Caravanserai",
      ru: "Бухарский караван-сарай",
    },
    period: {
      az: "XV əsrin sonu",
      tr: "XV. yüzyıl sonu",
      en: "late 15th century",
      ru: "конец XV века",
    },
    shortDescription: {
      az: "Şamaxı qapısından başlayan ticarət yolu üzərində karvansara.",
      tr: "Şamahı Kapısı'ndan başlayan ticaret yolu üzerindeki kervansaray.",
      en: "A caravanserai on the trade route from the Shamakhi Gate.",
      ru: "Караван-сарай на торговом пути от Шемахинских ворот.",
    },
    description: {
      az: "Buxara karvansarası Orta Asiyadan gələn tacirlərə xidmət edib. Dairəvi həyəti və onu əhatə edən otaqları İçərişəhərin ticarət memarlığının mühüm nümunəsidir.",
      tr: "Buhara Kervansarayı Orta Asya'dan gelen tüccarlara hizmet etti. Yuvarlak avlusu ve çevresindeki odalar ticaret mimarisinin önemli bir örneğidir.",
      en: "The Bukhara Caravanserai served merchants arriving from Central Asia. Its rounded courtyard and surrounding rooms are an important example of the Old City's commercial architecture.",
      ru: "Бухарский караван-сарай обслуживал купцов из Центральной Азии. Круглый двор и окружающие помещения — важный образец торговой архитектуры Старого города.",
    },
  }),
  bakuHistoricPlace({
    id: 10,
    slug: "baku-fortress-walls",
    coordinates: [49.8327, 40.3681],
    name: {
      az: "Bakı qala divarları və Qoşa qala qapısı",
      tr: "Bakü surları ve Çifte Kale Kapısı",
      en: "Baku Fortress Walls and Double Gate",
      ru: "Крепостные стены Баку и Двойные ворота",
    },
    period: {
      az: "XII əsr və sonrakı dövrlər",
      tr: "XII. yüzyıl ve sonrası",
      en: "12th century and later",
      ru: "XII век и позднее",
    },
    shortDescription: {
      az: "İçərişəhəri əhatələyən müdafiə sistemi və əsas giriş.",
      tr: "İçerişehir'i çevreleyen savunma sistemi ve ana giriş.",
      en: "The defensive enclosure and principal entrance of the Old City.",
      ru: "Оборонительная система и главный вход в Старый город.",
    },
    description: {
      az: "Qala divarları orta əsr Bakısının müdafiəsini təmin edirdi; qapılar gecələr bağlanırdı. Qoşa qala qapısı bu gün İçərişəhərin ən tanınan girişidir.",
      tr: "Surlar Orta Çağ Bakü'sünün savunmasını sağlıyor, kapılar geceleri kapatılıyordu. Çifte Kale Kapısı bugün İçerişehir'in en tanınmış girişidir.",
      en: "The walls protected medieval Baku, whose gates were closed at night. The Double Gate is now the Old City's best-known entrance.",
      ru: "Стены защищали средневековый Баку, а ворота закрывались на ночь. Двойные ворота сегодня являются самым узнаваемым входом в Ичери-шехер.",
    },
  }),
  bakuHistoricPlace({
    id: 11,
    slug: "baku-khans-residence",
    coordinates: [49.8324, 40.3684],
    name: {
      az: "Bakı xanlarının evi",
      tr: "Bakü Hanları Sarayı",
      en: "Residence of the Baku Khans",
      ru: "Дом бакинских ханов",
    },
    period: {
      az: "XVIII əsr",
      tr: "XVIII. yüzyıl",
      en: "18th century",
      ru: "XVIII век",
    },
    shortDescription: {
      az: "Şamaxı qapısı yaxınlığındakı xan iqamətgahı kompleksi.",
      tr: "Şamahı Kapısı yakınındaki han ikametgâhı kompleksi.",
      en: "A khan's residence complex near the Shamakhi Gate.",
      ru: "Комплекс ханской резиденции у Шемахинских ворот.",
    },
    description: {
      az: "Kompleks Bakı xanlığı dövrünün yaşayış və idarəçilik tarixini əks etdirir. Buraya yaşayış binaları, həyət və yeraltı təsərrüfat hissələri daxil olub.",
      tr: "Kompleks, Bakü Hanlığı döneminin konut ve yönetim tarihini yansıtır. Konut yapıları, avlu ve yeraltı hizmet bölümlerinden oluşuyordu.",
      en: "The complex reflects residential and administrative life during the Baku Khanate. It included dwellings, a courtyard and underground service spaces.",
      ru: "Комплекс отражает жилую и административную жизнь Бакинского ханства. Он включал жилые здания, двор и подземные хозяйственные помещения.",
    },
  }),
  oldCityMonument({
    id: 12,
    slug: "gasim-bey-hammam",
    coordinates: [49.8367, 40.3655],
    name: {
      az: "Qasım bəy hamamı",
      tr: "Kasım Bey Hamamı",
      en: "Gasim Bey Hammam",
      ru: "Баня Гасым-бека",
    },
    period: {
      az: "XV əsr",
      tr: "XV. yüzyıl",
      en: "15th century",
      ru: "XV век",
    },
    note: {
      az: "Şirvanşah I Xəlilullah dövründə Salyan qapısı yaxınlığında tikilmiş hamamdır.",
      tr: "Şirvanşah I Halilullah döneminde Salyan Kapısı yakınında inşa edilmiş hamamdır.",
      en: "A hammam built near the Salyan Gate during the reign of Shirvanshah Khalilullah I.",
      ru: "Баня, построенная у Сальянских ворот при Ширваншахе Халилулле I.",
    },
  }),
  oldCityMonument({
    id: 13,
    slug: "underground-hammam",
    coordinates: [49.8328, 40.3685],
    name: {
      az: "Yeraltı hamam",
      tr: "Yeraltı Hamamı",
      en: "Underground Hammam",
      ru: "Подземная баня",
    },
    period: {
      az: "orta əsrlər",
      tr: "Orta Çağ",
      en: "medieval period",
      ru: "Средневековье",
    },
    note: {
      az: "Qalıqları 2016-cı ildə Şamaxı qapısı yaxınlığındakı arxeoloji qazıntılarda üzə çıxarılıb.",
      tr: "Kalıntıları 2016'da Şamahı Kapısı yakınındaki arkeolojik kazılarda ortaya çıkarıldı.",
      en: "Its remains were uncovered during archaeological excavations near the Shamakhi Gate in 2016.",
      ru: "Остатки обнаружены при раскопках у Шемахинских ворот в 2016 году.",
    },
  }),
  oldCityMonument({
    id: 14,
    slug: "two-storey-caravanserai",
    coordinates: [49.8357, 40.3661],
    name: {
      az: "İkimərtəbəli karvansara",
      tr: "İki Katlı Kervansaray",
      en: "Two-storey Caravanserai",
      ru: "Двухэтажный караван-сарай",
    },
    period: {
      az: "XVII əsr",
      tr: "XVII. yüzyıl",
      en: "17th century",
      ru: "XVII век",
    },
    note: {
      az: "Bakı bəylərindən Qasım bəy Səlimxanovun tikdirdiyi ikimərtəbəli karvansaradır.",
      tr: "Bakülü beylerden Kasım Bey Selimhanov tarafından yaptırılan iki katlı kervansaraydır.",
      en: "A two-storey caravanserai commissioned by the Baku notable Gasim Bey Salimkhanov.",
      ru: "Двухэтажный караван-сарай, построенный бакинским беком Гасым-беком Салимхановым.",
    },
  }),
  oldCityMonument({
    id: 15,
    slug: "small-caravanserai",
    coordinates: [49.836, 40.3656],
    name: {
      az: "Xan karvansarası",
      tr: "Han Kervansarayı",
      en: "Khan's (Small) Caravanserai",
      ru: "Ханский (Малый) караван-сарай",
    },
    period: {
      az: "XII əsr",
      tr: "XII. yüzyıl",
      en: "12th century",
      ru: "XII век",
    },
    note: {
      az: "İçərişəhərin cənubunda düzbucaqlı həyət ətrafında qurulmuş karvansaradır.",
      tr: "İçerişehir'in güneyinde dikdörtgen bir avlu çevresinde kurulmuş kervansaraydır.",
      en: "A caravanserai in southern Icherisheher arranged around a rectangular courtyard.",
      ru: "Караван-сарай в южной части Ичери-шехера, устроенный вокруг прямоугольного двора.",
    },
  }),
  oldCityMonument({
    id: 16,
    slug: "agha-mikayil-hammam",
    coordinates: [49.8339, 40.3649],
    name: {
      az: "Ağa Mikayıl hamamı",
      tr: "Ağa Mikayıl Hamamı",
      en: "Agha Mikayil Hammam",
      ru: "Баня Ага Микаила",
    },
    period: {
      az: "XVIII əsr",
      tr: "XVIII. yüzyıl",
      en: "18th century",
      ru: "XVIII век",
    },
    note: {
      az: "Şamaxılı Hacı Ağa Mikayılın hamamçılar məhəlləsində tikdirdiyi hamamdır.",
      tr: "Şamahılı Hacı Ağa Mikayıl'ın hamamcılar mahallesinde yaptırdığı hamamdır.",
      en: "A hammam built by Haji Agha Mikayil of Shamakhi in the bathhouse-keepers' quarter.",
      ru: "Баня, построенная шемахинцем Гаджи Ага Микаилом в квартале банщиков.",
    },
  }),
  oldCityMonument({
    id: 17,
    slug: "khoja-gayib-hammam",
    coordinates: [49.8369, 40.3665],
    name: {
      az: "Hacı Qayıb hamamı",
      tr: "Hoca Gayib Hamamı",
      en: "Khoja Gayib Hammam",
      ru: "Баня Ходжа Гаиба",
    },
    period: {
      az: "XV əsrin sonu",
      tr: "XV. yüzyıl sonu",
      en: "late 15th century",
      ru: "конец XV века",
    },
    note: {
      az: "Qız Qalası yaxınlığında tacir Hacı Qayıbın sifarişi ilə tikilmiş hamamdır.",
      tr: "Kız Kalesi yakınında tüccar Hoca Gayib'in emriyle yaptırılmış hamamdır.",
      en: "A hammam near the Maiden Tower commissioned by the merchant Khoja Gayib.",
      ru: "Баня у Девичьей башни, построенная по заказу купца Ходжа Гаиба.",
    },
  }),
  oldCityMonument({
    id: 18,
    slug: "ashur-mosque",
    coordinates: [49.8359, 40.3657],
    name: {
      az: "Aşur məscidi",
      tr: "Aşur Camii",
      en: "Ashur Mosque",
      ru: "Мечеть Ашура",
    },
    period: {
      az: "XII əsr",
      tr: "XII. yüzyıl",
      en: "12th century",
      ru: "XII век",
    },
    note: {
      az: "Lezgi məscidi adı ilə də tanınan İçərişəhər məhəllə məscididir.",
      tr: "Lezgi Camii adıyla da bilinen bir İçerişehir mahalle camisidir.",
      en: "An Old City neighbourhood mosque also popularly known as the Lezgi Mosque.",
      ru: "Квартальная мечеть Старого города, известная также как Лезгинская мечеть.",
    },
  }),
  oldCityMonument({
    id: 19,
    slug: "bazaar-square",
    coordinates: [49.837, 40.3669],
    name: {
      az: "Bazar meydanı",
      tr: "Pazar Meydanı",
      en: "Bazaar Square",
      ru: "Базарная площадь",
    },
    period: {
      az: "XII–XV əsrlər",
      tr: "XII–XV. yüzyıllar",
      en: "12th–15th centuries",
      ru: "XII–XV века",
    },
    note: {
      az: "Qız Qalasının şimalında qazıntılarla aşkarlanmış Sıratağlı dini-memarlıq kompleksidir.",
      tr: "Kız Kalesi'nin kuzeyinde kazılarla ortaya çıkarılan kemerli dinî-mimari komplekstir.",
      en: "An arcaded religious-architectural complex excavated north of the Maiden Tower.",
      ru: "Арочный религиозно-архитектурный комплекс, раскрытый раскопками к северу от Девичьей башни.",
    },
  }),
  oldCityMonument({
    id: 20,
    slug: "tekya",
    coordinates: [49.8346, 40.3671],
    name: {
      az: "Təkiyə",
      tr: "Tekke",
      en: "Tekya",
      ru: "Текие",
    },
    period: {
      az: "XIII əsr",
      tr: "XIII. yüzyıl",
      en: "13th century",
      ru: "XIII век",
    },
    note: {
      az: "Böyük Qala küçəsində yerləşən orta əsr dini tikilisidir.",
      tr: "Büyük Kale Sokağı'nda bulunan Orta Çağ dinî yapısıdır.",
      en: "A medieval religious building on Boyuk Gala Street.",
      ru: "Средневековое культовое сооружение на улице Бёюк Гала.",
    },
  }),
  oldCityMonument({
    id: 21,
    slug: "khoja-bani-mosque",
    coordinates: [49.8335, 40.3667],
    name: {
      az: "Xoca Bani məscidi",
      tr: "Hoca Bani Camii",
      en: "Khoja Bani Mosque",
      ru: "Мечеть Ходжа Бани",
    },
    period: {
      az: "XVI əsr",
      tr: "XVI. yüzyıl",
      en: "16th century",
      ru: "XVI век",
    },
    note: {
      az: "Şirvanşahlar Sarayının şimalında memar Xoca Bani tərəfindən tikilmiş məsciddir.",
      tr: "Şirvanşahlar Sarayı'nın kuzeyinde mimar Hoca Bani tarafından yapılmış camidir.",
      en: "A mosque north of the Shirvanshahs' Palace built by the architect Khoja Bani.",
      ru: "Мечеть к северу от Дворца Ширваншахов, построенная зодчим Ходжа Бани.",
    },
  }),
  oldCityMonument({
    id: 22,
    slug: "giley-mosque",
    coordinates: [49.8332, 40.3672],
    name: {
      az: "Gileyli məscidi",
      tr: "Gileyli Camii",
      en: "Giley Mosque",
      ru: "Мечеть Гилейли",
    },
    period: {
      az: "orta əsrlər",
      tr: "Orta Çağ",
      en: "medieval period",
      ru: "Средневековье",
    },
    note: {
      az: "İki günbəzi və bəzəkli şəbəkə pəncərələri ilə seçilən qalaüstü məsciddir.",
      tr: "İki kubbesi ve bezemeli kafes pencereleriyle tanınan kale üstü camisidir.",
      en: "A mosque at the top of the fortress noted for two domes and ornate lattice windows.",
      ru: "Мечеть в верхней части крепости, известная двумя куполами и резными решётчатыми окнами.",
    },
  }),
  oldCityMonument({
    id: 23,
    slug: "khidir-mosque",
    coordinates: [49.8341, 40.3675],
    name: {
      az: "Xıdır məscidi",
      tr: "Hızır Camii",
      en: "Khidir Mosque",
      ru: "Мечеть Хыдыр",
    },
    period: { az: "1301", tr: "1301", en: "1301", ru: "1301 год" },
    note: {
      az: "Küçə səviyyəsinin fərqinə uyğun qurulmuş kiçik məhəllə məscididir.",
      tr: "Sokağın kot farkına uyarlanarak yapılmış küçük mahalle camisidir.",
      en: "A small neighbourhood mosque whose design responds to the changing street level.",
      ru: "Небольшая квартальная мечеть, архитектура которой приспособлена к перепаду уровня улицы.",
    },
  }),
  oldCityMonument({
    id: 24,
    slug: "molla-ahmad-mosque",
    coordinates: [49.8348, 40.3675],
    name: {
      az: "Molla Əhməd məscidi",
      tr: "Molla Ahmed Camii",
      en: "Molla Ahmad Mosque",
      ru: "Мечеть Молла Ахмеда",
    },
    period: {
      az: "XIV əsrin əvvəli",
      tr: "XIV. yüzyıl başı",
      en: "early 14th century",
      ru: "начало XIV века",
    },
    note: {
      az: "İçərişəhərin birzallı məhəllə məscidi tipinə aid tikilidir.",
      tr: "İçerişehir'in tek salonlu mahalle camisi tipindeki yapılarındandır.",
      en: "A single-hall building belonging to the Old City's neighbourhood-mosque type.",
      ru: "Однозальная постройка, относящаяся к типу квартальных мечетей Ичери-шехера.",
    },
  }),
  oldCityMonument({
    id: 25,
    slug: "quadrangular-tower",
    coordinates: [49.8381, 40.3671],
    name: {
      az: "Dördkünc qala",
      tr: "Dörtgen Kule",
      en: "Quadrangular Tower",
      ru: "Четырёхугольная башня",
    },
    period: {
      az: "XII əsr",
      tr: "XII. yüzyıl",
      en: "12th century",
      ru: "XII век",
    },
    note: {
      az: "Qala divarının şərq hissəsində şimaldan müdafiəni gücləndirmək üçün tikilmiş qüllədir.",
      tr: "Surun doğu bölümünde kuzeyden savunmayı güçlendirmek için yapılmış kuledir.",
      en: "A tower near the eastern wall built to strengthen the fortress's northern defence.",
      ru: "Башня у восточной стены, построенная для усиления обороны крепости с севера.",
    },
  }),
  oldCityMonument({
    id: 26,
    slug: "khans-mosque",
    coordinates: [49.8326, 40.3676],
    name: {
      az: "Xanlar məscidi",
      tr: "Hanlar Camii",
      en: "Khans' Mosque",
      ru: "Мечеть Ханлар",
    },
    period: {
      az: "XIX əsrin sonu",
      tr: "XIX. yüzyıl sonu",
      en: "late 19th century",
      ru: "конец XIX века",
    },
    note: {
      az: "Xanlarov qardaşlarının sifarişi ilə memar Məşədi Mirzə Qafar İzmayılovun layihəsi əsasında tikilib.",
      tr: "Hanlarov kardeşlerin siparişiyle mimar Meşedi Mirza Cafer İsmayılov'un projesine göre inşa edildi.",
      en: "Commissioned by the Khanlarov brothers and designed by architect Mashadi Mirza Gafar Izmayilov.",
      ru: "Построена по заказу братьев Ханларовых по проекту архитектора Мешади Мирзы Гафара Измайлова.",
    },
  }),
  oldCityMonument({
    id: 27,
    slug: "sheikh-ibrahim-mosque",
    coordinates: [49.8352, 40.3653],
    name: {
      az: "Şeyx İbrahim məscidi",
      tr: "Şeyh İbrahim Camii",
      en: "Sheikh Ibrahim Mosque",
      ru: "Мечеть Шейха Ибрагима",
    },
    period: {
      az: "1415–1416",
      tr: "1415–1416",
      en: "1415–1416",
      ru: "1415–1416",
    },
    note: {
      az: "Şeyx I İbrahim dövründə ticarət yolu üzərində tikilmiş günbəzli məsciddir.",
      tr: "Şeyh I İbrahim döneminde ticaret yolu üzerinde yapılmış kubbeli camidir.",
      en: "A domed mosque built on the fortress trade route during the reign of Sheikh Ibrahim I.",
      ru: "Купольная мечеть, построенная на торговой дороге крепости при Шейхе Ибрагиме I.",
    },
  }),
  oldCityMonument({
    id: 28,
    slug: "chin-mosque",
    coordinates: [49.8333, 40.3658],
    name: {
      az: "Çin məscidi",
      tr: "Çin Camii",
      en: "Chin Mosque",
      ru: "Мечеть Чин",
    },
    period: {
      az: "XIV əsr",
      tr: "XIV. yüzyıl",
      en: "14th century",
      ru: "XIV век",
    },
    note: {
      az: "Şirvanşahlar Sarayının cənub-qərbində yerləşən İmam Osman əş-Şirvani məscididir.",
      tr: "Şirvanşahlar Sarayı'nın güneybatısında bulunan İmam Osman eş-Şirvani camisidir.",
      en: "The Imam Osman ash-Shirvani Mosque southwest of the Shirvanshahs' Palace.",
      ru: "Мечеть Имама Османа аш-Ширвани к юго-западу от Дворца Ширваншахов.",
    },
  }),
  oldCityMonument({
    id: 29,
    slug: "seyid-yahya-bakuvi-mausoleum",
    coordinates: [49.8336, 40.3659],
    name: {
      az: "Seyid Yəhya Bakuvi türbəsi",
      tr: "Seyyid Yahya Bakuvi Türbesi",
      en: "Mausoleum of Seyid Yahya Bakuvi",
      ru: "Мавзолей Сейида Яхьи Бакуви",
    },
    period: {
      az: "XV əsr",
      tr: "XV. yüzyıl",
      en: "15th century",
      ru: "XV век",
    },
    note: {
      az: "Şirvanşahlar Sarayı kompleksində alim və sufi Seyid Yəhya Bakuviyə aid türbədir.",
      tr: "Şirvanşahlar Sarayı kompleksinde âlim ve sufi Seyyid Yahya Bakuvi'ye ait türbedir.",
      en: "A mausoleum in the Shirvanshahs' Palace complex associated with scholar and Sufi Seyid Yahya Bakuvi.",
      ru: "Мавзолей в комплексе Дворца Ширваншахов, связанный с учёным и суфием Сеидом Яхьёй Бакуви.",
    },
  }),
  oldCityMonument({
    id: 30,
    slug: "murad-gate",
    coordinates: [49.8335, 40.3655],
    name: {
      az: "Murad darvazası",
      tr: "Murad Kapısı",
      en: "Murad Gate",
      ru: "Ворота Мурада",
    },
    period: {
      az: "1585–1586",
      tr: "1585–1586",
      en: "1585–1586",
      ru: "1585–1586",
    },
    note: {
      az: "Şirvanşahlar Sarayı ansamblının Osmanlı hakimiyyəti dövründə əlavə edilmiş şərq portalıdır.",
      tr: "Şirvanşahlar Sarayı topluluğuna Osmanlı yönetimi döneminde eklenen doğu portalıdır.",
      en: "The eastern portal added to the Shirvanshahs' Palace ensemble during Ottoman rule.",
      ru: "Восточный портал, добавленный к ансамблю Дворца Ширваншахов в период османского правления.",
    },
  }),
  greaterBakuMonument({
    id: 31,
    slug: "ramana-castle",
    coordinates: [49.9806, 40.4563],
    source: "https://president.az/az/articles/view/56630",
    name: {
      az: "Ramana qalası",
      tr: "Ramana Kalesi",
      en: "Ramana Castle",
      ru: "Раманинская крепость",
    },
    city: { az: "Ramana", tr: "Ramana", en: "Ramana", ru: "Рамана" },
    period: {
      az: "XII–XIV əsrlər",
      tr: "XII–XIV. yüzyıllar",
      en: "12th–14th centuries",
      ru: "XII–XIV века",
    },
    note: {
      az: "Qaya üzərində ucaldılmış, Şirvanşahlar dövrü ilə əlaqələndirilən müdafiə qalasıdır.",
      tr: "Kaya üzerinde yükselen ve Şirvanşahlar dönemiyle ilişkilendirilen savunma kalesidir.",
      en: "A defensive castle raised on rock and associated with the Shirvanshah period.",
      ru: "Оборонительная крепость на скале, связанная с эпохой Ширваншахов.",
    },
  }),
  greaterBakuMonument({
    id: 32,
    slug: "gala-reserve",
    coordinates: [50.1722, 40.4426],
    source:
      "https://azerbaijan.travel/gala-state-historical-and-ethnographic-reserve",
    name: {
      az: "Qala Dövlət Tarix-Etnoqrafiya Qoruğu",
      tr: "Gala Tarih ve Etnografya Koruma Alanı",
      en: "Gala Historical and Ethnographic Reserve",
      ru: "Гала — историко-этнографический заповедник",
    },
    city: { az: "Qala", tr: "Gala", en: "Gala", ru: "Гала" },
    period: {
      az: "e.ə. III–II minilliklərdən orta əsrlərə",
      tr: "MÖ III–II. binyıllardan Orta Çağ'a",
      en: "3rd–2nd millennia BC to the medieval era",
      ru: "III–II тысячелетия до н. э. — Средневековье",
    },
    note: {
      az: "Qayaüstü təsvirləri, qədim məişət izlərini və XIV əsr qalasını birləşdirən açıq səma altında qoruqdur.",
      tr: "Kaya resimlerini, eski yaşam izlerini ve XIV. yüzyıl kalesini birleştiren açık hava koruma alanıdır.",
      en: "An open-air reserve combining rock art, ancient everyday remains and a 14th-century fortress.",
      ru: "Заповедник под открытым небом с наскальными рисунками, древним бытом и крепостью XIV века.",
    },
  }),
  greaterBakuMonument({
    id: 33,
    slug: "mardakan-quadrangular-castle",
    coordinates: [50.1445, 40.4916],
    source: absheronSource,
    name: {
      az: "Mərdəkan dördkünc qalası",
      tr: "Merdekan Dörtgen Kalesi",
      en: "Mardakan Quadrangular Castle",
      ru: "Четырёхугольный Мардакянский замок",
    },
    city: {
      az: "Mərdəkan",
      tr: "Merdekan",
      en: "Mardakan",
      ru: "Мардакян",
    },
    period: {
      az: "XIV əsr",
      tr: "XIV. yüzyıl",
      en: "14th century",
      ru: "XIV век",
    },
    note: {
      az: "Abşeronun müdafiə qüllələri sisteminə daxil olan hündür dördkünc qaladır.",
      tr: "Abşeron savunma kuleleri sisteminin parçası olan yüksek, dörtgen bir kaledir.",
      en: "A tall quadrangular stronghold in Absheron's network of defensive towers.",
      ru: "Высокая четырёхугольная крепость в системе оборонительных башен Апшерона.",
    },
  }),
  greaterBakuMonument({
    id: 34,
    slug: "mardakan-round-castle",
    coordinates: [50.1481, 40.4928],
    source: absheronSource,
    name: {
      az: "Mərdəkan dairəvi qalası",
      tr: "Merdekan Yuvarlak Kalesi",
      en: "Mardakan Round Castle",
      ru: "Круглый Мардакянский замок",
    },
    city: {
      az: "Mərdəkan",
      tr: "Merdekan",
      en: "Mardakan",
      ru: "Мардакян",
    },
    period: {
      az: "XIII əsr",
      tr: "XIII. yüzyıl",
      en: "13th century",
      ru: "XIII век",
    },
    note: {
      az: "Dairəvi donjonu ilə seçilən orta əsr Abşeron müdafiə tikilisidir.",
      tr: "Yuvarlak ana kulesiyle tanınan Orta Çağ Abşeron savunma yapısıdır.",
      en: "A medieval Absheron defensive structure distinguished by its round keep.",
      ru: "Средневековое оборонительное сооружение Апшерона с круглым донжоном.",
    },
  }),
  greaterBakuMonument({
    id: 35,
    slug: "nardaran-castle",
    coordinates: [50.0062, 40.5631],
    source: absheronSource,
    name: {
      az: "Nardaran qalası",
      tr: "Nardaran Kalesi",
      en: "Nardaran Castle",
      ru: "Нардаранская крепость",
    },
    city: {
      az: "Nardaran",
      tr: "Nardaran",
      en: "Nardaran",
      ru: "Нардаран",
    },
    period: { az: "1301", tr: "1301", en: "1301", ru: "1301 год" },
    note: {
      az: "Yazılı kitabəsi olan, Abşeronun orta əsr müdafiə sisteminə daxil qala-qüllədir.",
      tr: "Kitabesi bulunan, Abşeron'un Orta Çağ savunma sistemine ait kale kuledir.",
      en: "An inscribed castle-tower forming part of Absheron's medieval defence system.",
      ru: "Крепость-башня с надписью, входившая в средневековую оборонительную систему Апшерона.",
    },
  }),
  greaterBakuMonument({
    id: 36,
    slug: "villa-petrolea",
    coordinates: [49.8728, 40.3837],
    source: "https://azerbaijan.travel/nobel-brothers-house-museum",
    name: {
      az: "Villa Petrolea — Nobel qardaşlarının evi",
      tr: "Villa Petrolea — Nobel Kardeşler Evi",
      en: "Villa Petrolea — Nobel Brothers' House",
      ru: "Вилла Петролеа — дом братьев Нобелей",
    },
    period: {
      az: "1882–1884",
      tr: "1882–1884",
      en: "1882–1884",
      ru: "1882–1884",
    },
    note: {
      az: "Nobel ailəsinin Bakı iqamətgahı kimi tikilmiş, bu gün ev-muzeyi olan neft bumu malikanəsidir.",
      tr: "Nobel ailesinin Bakü konutu olarak inşa edilmiş, bugün ev müzesi olan petrol patlaması dönemi konağıdır.",
      en: "An oil-boom mansion built as the Nobel family's Baku residence and now operating as a house museum.",
      ru: "Особняк нефтяного бума, построенный как бакинская резиденция Нобелей и ныне работающий как дом-музей.",
    },
  }),
  greaterBakuMonument({
    id: 37,
    slug: "taghiyev-mansion",
    coordinates: [49.8396, 40.3694],
    name: {
      az: "Hacı Zeynalabdin Tağıyevin malikanəsi",
      tr: "Hacı Zeynelabidin Tağıyev Konağı",
      en: "Haji Zeynalabdin Taghiyev Mansion",
      ru: "Особняк Гаджи Зейналабдина Тагиева",
    },
    period: {
      az: "XIX əsrin sonu",
      tr: "XIX. yüzyıl sonu",
      en: "late 19th century",
      ru: "конец XIX века",
    },
    note: {
      az: "Neft sənayeçisi və xeyriyyəçi Tağıyevin keçmiş malikanəsidir; burada Milli Azərbaycan Tarixi Muzeyi yerləşir.",
      tr: "Petrol sanayicisi ve hayırsever Tağıyev'in eski konağıdır; Azerbaycan Millî Tarih Müzesi burada bulunur.",
      en: "The former mansion of oil industrialist and philanthropist Taghiyev, now home to the National Museum of History.",
      ru: "Бывший особняк нефтепромышленника и мецената Тагиева, где размещается Национальный музей истории.",
    },
  }),
  greaterBakuMonument({
    id: 38,
    slug: "palace-of-happiness",
    coordinates: [49.8306, 40.3687],
    name: {
      az: "Səadət Sarayı",
      tr: "Saadet Sarayı",
      en: "Palace of Happiness",
      ru: "Дворец счастья",
    },
    period: {
      az: "XX əsrin əvvəli",
      tr: "XX. yüzyıl başı",
      en: "early 20th century",
      ru: "начало XX века",
    },
    note: {
      az: "Murtuza Muxtarov üçün tikilmiş qotik üslublu neft bumu malikanəsidir.",
      tr: "Murtuza Muhtarov için yapılmış Gotik üsluplu petrol patlaması dönemi konağıdır.",
      en: "A Gothic-style oil-boom mansion built for Murtuza Mukhtarov.",
      ru: "Особняк эпохи нефтяного бума в готическом стиле, построенный для Муртузы Мухтарова.",
    },
  }),
  greaterBakuMonument({
    id: 39,
    slug: "ismailiyya-palace",
    coordinates: [49.8318, 40.3693],
    name: {
      az: "İsmailiyyə Sarayı",
      tr: "İsmailiye Sarayı",
      en: "Ismailiyya Palace",
      ru: "Дворец Исмаилия",
    },
    period: {
      az: "XX əsrin əvvəli",
      tr: "XX. yüzyıl başı",
      en: "early 20th century",
      ru: "начало XX века",
    },
    note: {
      az: "Musa Nağıyevin sifarişi ilə tikilmiş Venesiya qotikası üslublu ictimai binadır.",
      tr: "Musa Nağıyev'in siparişiyle yapılmış Venedik Gotik üslubundaki kamusal yapıdır.",
      en: "A Venetian Gothic public building commissioned by Musa Naghiyev.",
      ru: "Общественное здание в стиле венецианской готики, построенное по заказу Мусы Нагиева.",
    },
  }),
  greaterBakuMonument({
    id: 40,
    slug: "baku-city-hall",
    coordinates: [49.8309, 40.3682],
    name: {
      az: "Bakı Şəhər İcra Hakimiyyətinin binası",
      tr: "Bakü Belediye Binası",
      en: "Baku City Hall",
      ru: "Здание Бакинской городской управы",
    },
    period: {
      az: "XX əsrin əvvəli",
      tr: "XX. yüzyıl başı",
      en: "early 20th century",
      ru: "начало XX века",
    },
    note: {
      az: "Bakının neft bumu dövrü şəhər memarlığının mühüm inzibati tikilisidir.",
      tr: "Bakü'nün petrol patlaması dönemi kent mimarisinin önemli idari yapısıdır.",
      en: "A major civic building from Baku's oil-boom architectural period.",
      ru: "Крупное административное здание архитектуры бакинского нефтяного бума.",
    },
  }),
  greaterBakuMonument({
    id: 41,
    slug: "baku-philharmonic",
    coordinates: [49.8298, 40.3658],
    name: {
      az: "Azərbaycan Dövlət Filarmoniyasının binası",
      tr: "Azerbaycan Devlet Filarmoni Binası",
      en: "Azerbaijan State Philharmonic Hall",
      ru: "Здание Азербайджанской государственной филармонии",
    },
    period: {
      az: "XX əsrin əvvəli",
      tr: "XX. yüzyıl başı",
      en: "early 20th century",
      ru: "начало XX века",
    },
    note: {
      az: "İctimai toplantılar üçün inşa edilmiş və sonradan filarmoniya kimi istifadə olunan tarixi konsert binasıdır.",
      tr: "Toplumsal buluşmalar için inşa edilmiş, daha sonra filarmoni olarak kullanılan tarihî konser binasıdır.",
      en: "A historic concert building first created for public gatherings and later used as a philharmonic hall.",
      ru: "Исторический концертный зал, первоначально построенный для общественных собраний, а позднее ставший филармонией.",
    },
  }),
  greaterBakuMonument({
    id: 42,
    slug: "church-of-the-saviour",
    coordinates: [49.8358, 40.3763],
    name: {
      az: "Xilaskar kilsəsi",
      tr: "Kurtarıcı Kilisesi",
      en: "Church of the Saviour",
      ru: "Кирха Спасителя",
    },
    period: {
      az: "XIX əsrin sonu",
      tr: "XIX. yüzyıl sonu",
      en: "late 19th century",
      ru: "конец XIX века",
    },
    note: {
      az: "Bakının alman lüteran icması üçün tikilmiş neoqotik kilsə binasıdır.",
      tr: "Bakü'nün Alman Lutheran cemaati için yapılmış Neogotik kilise binasıdır.",
      en: "A Neo-Gothic church built for Baku's German Lutheran community.",
      ru: "Неоготическая церковь, построенная для немецкой лютеранской общины Баку.",
    },
  }),
  greaterBakuMonument({
    id: 43,
    slug: "taza-pir-mosque",
    coordinates: [49.8261, 40.3718],
    name: {
      az: "Təzəpir məscidi",
      tr: "Tezepir Camii",
      en: "Taza Pir Mosque",
      ru: "Мечеть Тезепир",
    },
    period: {
      az: "1905–1914",
      tr: "1905–1914",
      en: "1905–1914",
      ru: "1905–1914",
    },
    note: {
      az: "Nabat xanım Aşurbəyovanın himayəsi ilə inşa edilmiş Bakı məscididir.",
      tr: "Nabat Hanım Aşurbeyova'nın desteğiyle inşa edilmiş Bakü camisidir.",
      en: "A Baku mosque built under the patronage of Nabat Khanum Ashurbeyova.",
      ru: "Бакинская мечеть, построенная при покровительстве Набат-ханум Ашурбековой.",
    },
  }),
  greaterBakuMonument({
    id: 44,
    slug: "bibi-heybat-mosque",
    coordinates: [49.8181, 40.3086],
    name: {
      az: "Bibiheybət məscidi",
      tr: "Bibiheybet Camii",
      en: "Bibi-Heybat Mosque",
      ru: "Мечеть Биби-Эйбат",
    },
    period: {
      az: "orta əsr ziyarətgahı; müasir bərpa",
      tr: "Orta Çağ ziyaretgâhı; modern yeniden yapım",
      en: "medieval shrine; modern reconstruction",
      ru: "средневековая святыня; современная реконструкция",
    },
    note: {
      az: "Tarixi ziyarətgahın yerində yenidən qurulmuş dini kompleksdir; ilkin tikili sovet dövründə dağıdılmışdı.",
      tr: "Tarihî ziyaretgâhın yerinde yeniden kurulmuş dinî komplekstir; özgün yapı Sovyet döneminde yıkılmıştı.",
      en: "A religious complex reconstructed on the site of a historic shrine after the earlier building was destroyed in the Soviet period.",
      ru: "Религиозный комплекс, восстановленный на месте исторической святыни после разрушения прежнего здания в советский период.",
    },
  }),
  greaterBakuMonument({
    id: 45,
    slug: "baku-railway-station",
    coordinates: [49.8491, 40.3798],
    name: {
      az: "Bakı dəmiryol vağzalının tarixi binası",
      tr: "Bakü Tren Garı Tarihî Binası",
      en: "Historic Baku Railway Station",
      ru: "Историческое здание Бакинского вокзала",
    },
    period: {
      az: "XIX əsrin sonu",
      tr: "XIX. yüzyıl sonu",
      en: "late 19th century",
      ru: "конец XIX века",
    },
    note: {
      az: "Bakının dəmiryol tarixini və neft bumu dövrünün nəqliyyat inkişafını əks etdirən vağzal kompleksidir.",
      tr: "Bakü'nün demiryolu tarihini ve petrol patlaması döneminin ulaşım gelişimini yansıtan gar kompleksidir.",
      en: "A station complex reflecting Baku's railway history and the transport growth of the oil-boom era.",
      ru: "Вокзальный комплекс, отражающий железнодорожную историю Баку и транспортное развитие эпохи нефтяного бума.",
    },
  }),
];

const validatePlaceCoordinates = (records, coordinateOverrides) => {
  const errors = [];
  const usedIds = new Set();
  const usedSlugs = new Set();
  const usedCoordinates = new Map();

  for (const place of records) {
    if (usedIds.has(place.id)) {
      errors.push(`Tekrarlanan ID tapıldı: ${place.id}.`);
    }
    usedIds.add(place.id);

    if (usedSlugs.has(place.slug)) {
      errors.push(`Tekrarlanan slug tapıldı: ${place.slug}.`);
    }
    usedSlugs.add(place.slug);

    const coordinates = coordinateOverrides[place.id];

    if (!coordinates) {
      errors.push(
        `ID ${place.id} (${place.slug}): verifiedCoordinates daxilində koordinat yoxdur.`,
      );
      continue;
    }

    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      !coordinates.every(Number.isFinite)
    ) {
      errors.push(
        `ID ${place.id} (${place.slug}): koordinat formatı etibarsızdır.`,
      );
      continue;
    }

    const [longitude, latitude] = coordinates;

    // Dataset Bakı, Abşeron və Qobustan ərazilərini əhatə edir.
    if (
      longitude < 49.2 ||
      longitude > 50.4 ||
      latitude < 40.0 ||
      latitude > 40.7
    ) {
      errors.push(
        `ID ${place.id} (${place.slug}): koordinat gözlənilən sərhədlərdən kənardadır: ` +
          `[${longitude}, ${latitude}].`,
      );
    }

    const coordinateKey = `${longitude.toFixed(7)},${latitude.toFixed(7)}`;

    if (usedCoordinates.has(coordinateKey)) {
      errors.push(
        `ID ${place.id} (${place.slug}) ilə ID ${usedCoordinates.get(
          coordinateKey,
        )} eyni koordinata malikdir.`,
      );
    } else {
      usedCoordinates.set(coordinateKey, place.id);
    }
  }

  const recordIds = new Set(records.map((place) => place.id));

  for (const id of Object.keys(coordinateOverrides).map(Number)) {
    if (!recordIds.has(id)) {
      errors.push(
        `verifiedCoordinates daxilində placeRecords-da olmayan əlavə ID var: ${id}.`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Tarixi məkan məlumatlarında problem tapıldı:\n${errors.join("\n")}`,
    );
  }

  return true;
};

if (import.meta.env?.DEV) {
  validatePlaceCoordinates(placeRecords, verifiedCoordinates);
}

export const placeCategories = Object.freeze({
  palace: { az: "Saray və malikanə", tr: "Saray ve konak", en: "Palace and mansion", ru: "Дворец и особняк" },
  religious: { az: "Dini abidə", tr: "Dini yapı", en: "Religious monument", ru: "Религиозный памятник" },
  historicQuarter: { az: "Tarixi və arxeoloji qoruq", tr: "Tarihi ve arkeolojik alan", en: "Historic and archaeological reserve", ru: "Историко-археологический заповедник" },
  mosque: { az: "Məscid", tr: "Cami", en: "Mosque", ru: "Мечеть" },
  caravanserai: { az: "Karvansara", tr: "Kervansaray", en: "Caravanserai", ru: "Караван-сарай" },
  fortification: { az: "Qala və istehkam", tr: "Kale ve sur", en: "Castle and fortification", ru: "Крепость и укрепление" },
  hammam: { az: "Hamam", tr: "Hamam", en: "Hammam", ru: "Хаммам" },
  civic: { az: "İctimai memarlıq", tr: "Kamu mimarisi", en: "Civic architecture", ru: "Общественная архитектура" },
});

const categoryByPlaceId = Object.freeze({
  1: "fortification",
  2: "palace", 3: "religious", 4: "historicQuarter", 5: "historicQuarter",
  6: "mosque", 7: "mosque", 8: "caravanserai", 9: "caravanserai",
  10: "fortification", 11: "palace", 12: "hammam", 13: "hammam",
  14: "caravanserai", 15: "caravanserai", 16: "hammam", 17: "hammam",
  18: "mosque", 19: "civic", 20: "religious", 21: "mosque",
  22: "mosque", 23: "mosque", 24: "mosque", 25: "fortification",
  26: "mosque", 27: "mosque", 28: "mosque", 29: "religious",
  30: "fortification", 31: "fortification", 32: "historicQuarter",
  33: "fortification", 34: "fortification", 35: "fortification",
  36: "palace", 37: "palace", 38: "palace", 39: "palace",
  40: "civic", 41: "civic", 42: "religious", 43: "mosque",
  44: "mosque", 45: "civic",
});

export const places = Object.freeze(
  placeRecords.map((place) =>
    Object.freeze({
      ...place,
      category: categoryByPlaceId[place.id] ?? "civic",
      coordinates: Object.freeze(
        [...getVerifiedCoordinates(place.id, place.coordinates)],
      ),
    }),
  ),
);

export const getPlaceById = (id) =>
  places.find((place) => place.id === Number(id)) ?? null;

export const getPlaceBySlug = (slug) =>
  places.find((place) => place.slug === slug) ?? null;

export const historicalPlaces = places;
