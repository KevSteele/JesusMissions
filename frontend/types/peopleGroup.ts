export interface PeopleGroupResource {
    ROL3: string;
    Category: string;
    WebText: string;
    URL: string;
}

export interface PeopleGroup {
    // Core Identity
    PeopleID3: number;
    PeopNameInCountry: string;
    PeopNameAcrossCountries: string;
    PeopleID3ROG3: string;

    // Location
    Ctry: string;
    ISO3: string;
    LocationInCountry: string | null;
    Latitude: number;
    Longitude: number;
    Continent: string;
    RegionName: string;
    ROG3: string;
    ROG2: string;
    ROP3: number;

    // Population
    Population: number;
    PopulationPGAC: number;

    // Missional Status
    JPScale: number;
    JPScaleText: string;
    JPScaleImageURL: string;
    JPScalePC: string;
    JPScalePGAC: string;
    LeastReached: 'Y' | 'N';
    LeastReachedPC: 'Y' | 'N';
    LeastReachedPGAC: 'Y' | 'N';
    Frontier: 'Y' | 'N';
    Window1040: 'Y' | 'N';
    LRTop100: 'Y' | 'N';

    // Religion
    PrimaryReligion: string;
    PrimaryReligionPC: string;
    PrimaryReligionPGAC: string;
    ReligionSubdivision: string | null;
    RLG3: number;
    RLG3PC: number;
    RLG3PGAC: number;
    PercentAdherents: string;
    PercentEvangelical: string;
    PercentEvangelicalPC: string;
    PercentEvangelicalPGAC: string;
    PercentChristianPC: string;
    PercentChristianPGAC: string;
    PCIslam: number;
    PCBuddhism: number;
    PCHinduism: number;
    PCNonReligious: number;
    PCEthnicReligions: number;
    PCOtherSmall: number;
    PCUnknown: number;

    // Language & Scripture
    PrimaryLanguageName: string;
    PrimaryLanguageDialect: string | null;
    ROL3: string;
    NumberLanguagesSpoken: number;
    OfficialLang: string;
    SpeakNationalLang: string | null;
    BibleStatus: number;
    BibleYear: string | null;
    NTYear: string | null;
    PortionsYear: string | null;
    TranslationNeedQuestionable: string | null;
    NTOnline: string | null;

    // Media Resources
    HasJesusFilm: 'Y' | 'N';
    HasAudioRecordings: 'Y' | 'N';
    JF: 'Y' | 'N';
    AudioRecordings: 'Y' | 'N';

    // URLs and Media
    PeopleGroupURL: string;
    PeopleGroupPhotoURL: string;
    PeopleGroupMapURL: string;
    PeopleGroupMapExpandedURL: string;
    CountryURL: string;
    PhotoAddress: string;
    PhotoCredits: string | null;
    PhotoCreditURL: string | null;
    PhotoCreativeCommons: 'Y' | 'N';
    PhotoCopyright: 'Y' | 'N';
    PhotoPermission: 'Y' | 'N';
    PhotoCCVersionText: string;
    PhotoCCVersionURL: string;
    MapAddress: string;
    MapCredits: string;
    MapCreditURL: string;
    MapCopyright: 'Y' | 'N';
    MapCCVersionText: string;
    MapCCVersionURL: string;

    // Profile and Content
    ProfileTextExists: 'Y' | 'N';
    Summary: string;
    Obstacles: string;
    HowReach: string;
    PrayForChurch: string;
    PrayForPG: string;
    Resources: PeopleGroupResource[];

    // Additional Info
    Category: string;
    CountOfCountries: number;
    CountOfProvinces: number | null;
    IndigenousCode: 'Y' | 'N';
    NaturalName: string;
    NaturalPronunciation: string;
    SecurityLevel: number;
    GSEC: string;
    Nomadic: 'Y' | 'N';
    NomadicTypeDescription: string | null;
    RegionCode: number;

    // Affinity and Cluster
    PeopleID1: number;
    ROP1: string;
    AffinityBloc: string;
    PeopleID2: number;
    ROP2: string;
    PeopleCluster: string;
}
