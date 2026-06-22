'use client';

// LOGO_MAP matches channel names against keywords to find high-quality logos.
// Values combine handpicked Wikimedia SVG logos and auto-fetched logos from the iptv-org database.
const LOGO_MAP = [
  {
    "keywords": [
      "somoy"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/14/Somoy_TV_logo.svg"
  },
  {
    "keywords": [
      "t sports",
      "tsports"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/25/T-sports-logo.png"
  },
  {
    "keywords": [
      "caze"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Caz%C3%A9TV.png"
  },
  {
    "keywords": [
      "bein"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c5/BeIN_Sports_logo.svg"
  },
  {
    "keywords": [
      "tsn"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/41/TSN_Logo.svg"
  },
  {
    "keywords": [
      "sport5"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Sport_5_logo.png"
  },
  {
    "keywords": [
      "dazn"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/23/DAZN_Logo.svg"
  },
  {
    "keywords": [
      "cctv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e9/CCTV-5_logo.svg"
  },
  {
    "keywords": [
      "rtbgo",
      "rtb go"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Radio_Television_Brunei_logo.png"
  },
  {
    "keywords": [
      "sportv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/3d/SporTV_logo.svg"
  },
  {
    "keywords": [
      "trt",
      "tr sport",
      "idman"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/87/TRT_Spor_logo_2021.svg"
  },
  {
    "keywords": [
      "dsports",
      "d sports"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/D_Sports_logo.svg/1024px-D_Sports_logo.svg.png"
  },
  {
    "keywords": [
      "fussball"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/1280px-2026_FIFA_World_Cup_emblem.svg.png"
  },
  {
    "keywords": [
      "joj"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/36/JOJ_Group_logo.png"
  },
  {
    "keywords": [
      "tvp"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/34/TVP_Sport_logo_2021.svg"
  },
  {
    "keywords": [
      "real madrid",
      "rmtv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/de/Real_Madrid_TV_Logo.png"
  },
  {
    "keywords": [
      "willow"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/07/Willow_logo.png"
  },
  {
    "keywords": [
      "fancode"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8a/FanCode_Logo.png"
  },
  {
    "keywords": [
      "telemundo"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Telemundo_logo.svg"
  },
  {
    "keywords": [
      "fox sports",
      "fox sports 2",
      "fox ny",
      "fox 11",
      "fx sports",
      "fx prem"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/17/Fox_Sports_logo.svg"
  },
  {
    "keywords": [
      "quran"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Saudi_Quran_logo.png"
  },
  {
    "keywords": [
      "btv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b6/BTV_logo.svg"
  },
  {
    "keywords": [
      "sansad"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Sansad_TV_logo.png"
  },
  {
    "keywords": [
      "ptv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d2/PTV_Sports_logo_2022.svg"
  },
  {
    "keywords": [
      "tyc"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/67/TyC_Sports_Logo_2021.png"
  },
  {
    "keywords": [
      "fubo"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Fubo_TV_logo.svg"
  },
  {
    "keywords": [
      "redbull",
      "red bull"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Red_Bull_TV_logo.svg"
  },
  {
    "keywords": [
      "fight network"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Fight_Network_logo.png"
  },
  {
    "keywords": [
      "fuel tv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/ff/FUEL_TV_Logo.svg"
  },
  {
    "keywords": [
      "horse & country"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/23/Horse_%26_Country_logo.png"
  },
  {
    "keywords": [
      "sport italia",
      "sportitalia"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/30/Sportitalia_logo_2019.png"
  },
  {
    "keywords": [
      "cignal"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/07/Cignal_logo.png"
  },
  {
    "keywords": [
      "sky"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/34/Sky_Sports_logo_2020.svg"
  },
  {
    "keywords": [
      "starhub"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/StarHub_Logo.svg"
  },
  {
    "keywords": [
      "star sports",
      "sspts"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/52/Star_Sports_logo.svg"
  },
  {
    "keywords": [
      "espn"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg"
  },
  {
    "keywords": [
      "sony max"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Sony_MAX_logo.svg"
  },
  {
    "keywords": [
      "star jalsha"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/69/Star_Jalsha_logo.png"
  },
  {
    "keywords": [
      "zee bangla"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Zee_Bangla_Logo.png"
  },
  {
    "keywords": [
      "colors bangla"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/de/Colors_Bangla_logo.png"
  },
  {
    "keywords": [
      "ntv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/87/NTV_Bangladesh_logo.png"
  },
  {
    "keywords": [
      "rtv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/dc/RTV_Bangladesh_Logo.png"
  },
  {
    "keywords": [
      "jamuna"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Jamuna_Television_logo.png"
  },
  {
    "keywords": [
      "ekattor"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Ekattor_TV_logo.png"
  },
  {
    "keywords": [
      "channel i"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/89/Channel_i_logo.png"
  },
  {
    "keywords": [
      "duronto"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Duronto_TV_logo.png"
  },
  {
    "keywords": [
      "banglavision",
      "bangla vision"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Banglavision_logo.svg/1024px-Banglavision_logo.svg.png"
  },
  {
    "keywords": [
      "independent tv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Independent_Television_logo.png"
  },
  {
    "keywords": [
      "dbc news"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d3/DBC_News_logo.png"
  },
  {
    "keywords": [
      "maasranga"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/36/Maasranga_TV_logo.png"
  },
  {
    "keywords": [
      "deepto"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Deepto_TV_logo.png"
  },
  {
    "keywords": [
      "republic bangla"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Republic_Media_Network_Logo.png"
  },
  {
    "keywords": [
      "dd national"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a2/DD_National_logo.svg"
  },
  {
    "keywords": [
      "goldmines"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/23/Goldmines_Telefilms_logo.png"
  },
  {
    "keywords": [
      "channel 24"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Channel_24_Bangladesh_logo.png"
  },
  {
    "keywords": [
      "channel 9"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/52/Channel_9_Bangladesh_Logo.png"
  },
  {
    "keywords": [
      "atn news"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/13/ATN_News_logo.png"
  },
  {
    "keywords": [
      "atn bangla"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/f6/ATN_Bangla_logo.png"
  },
  {
    "keywords": [
      "news 24",
      "news24 bd"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b3/News_24_Bangladesh_Logo.png"
  },
  {
    "keywords": [
      "desh tv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Desh_TV_logo.png"
  },
  {
    "keywords": [
      "bijoy tv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Bijoy_TV_logo.png"
  },
  {
    "keywords": [
      "sony aath"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/87/Sony_Aath_logo.png"
  },
  {
    "keywords": [
      "g-series",
      "g series"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c2/G-Series_logo.png"
  },
  {
    "keywords": [
      "etv josh",
      "etv network"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/df/ETV_Network_Logo.svg"
  },
  {
    "keywords": [
      "oli tv"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/10/Colors_Bangla_logo.png"
  },
  {
    "keywords": [
      "asports",
      "a sports"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/54/A_Sports_logo.png"
  },
  {
    "keywords": [
      "a spor"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/ce/A_Spor_logo.png"
  },
  {
    "keywords": [
      "euro tv sports",
      "eurosport"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/70/Eurosport_logo.svg"
  },
  {
    "keywords": [
      "dd sports"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/91/DD_Sports_logo.svg"
  },
  {
    "keywords": [
      "cricket gold"
    ],
    "logo": "https://resources.cricket-australia.pulselive.com/cricket-australia/photo/2025/07/25/836eddae-4329-4542-ad17-dcd37e9d951a/Cricket-Gold-1920x1080_noBG.png"
  },
  {
    "keywords": [
      "channel 1 news 4k"
    ],
    "logo": "https://i.imgur.com/CZy4Cqi.png"
  },
  {
    "keywords": [
      "star news bd"
    ],
    "logo": "https://i.imgur.com/TWFDkap.png"
  },
  {
    "keywords": [
      "ananda tv"
    ],
    "logo": "https://hosting.renderforestsites.com/35126779/1641323/media/080149eae7588f361ccb01b1387c00ca.webp"
  },
  {
    "keywords": [
      "boishakhi tv"
    ],
    "logo": "https://i.imgur.com/gxL05Y4.png"
  },
  {
    "keywords": [
      "bangla tv"
    ],
    "logo": "https://i.imgur.com/rKRsYAP.png"
  },
  {
    "keywords": [
      "sa tv"
    ],
    "logo": "https://i.imgur.com/tL9kxxB.png"
  },
  {
    "keywords": [
      "ekhon tv"
    ],
    "logo": "https://i.imgur.com/tRrDh6z.png"
  },
  {
    "keywords": [
      "ekushe tv"
    ],
    "logo": "https://i.imgur.com/lRpkGHj.png"
  },
  {
    "keywords": [
      "my tv"
    ],
    "logo": "https://i.imgur.com/475qK5T.png"
  },
  {
    "keywords": [
      "nexus tv"
    ],
    "logo": "https://i.imgur.com/XcJZKg4.png"
  },
  {
    "keywords": [
      "channel s tv"
    ],
    "logo": "https://www.channels.com.bd/storage/project_files/logo/2024-05-14a_n17156821814310.png"
  },
  {
    "keywords": [
      "srk tv"
    ],
    "logo": "https://i.imgur.com/6PqxuhF.png"
  },
  {
    "keywords": [
      "eet tv"
    ],
    "logo": "https://i.imgur.com/rntSEDZ.png"
  },
  {
    "keywords": [
      "gangaur tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Gangaur.png"
  },
  {
    "keywords": [
      "gtc punjabi"
    ],
    "logo": "https://media.thegtcnetwork.com/uploads/gtc-pujabin-s.jpg"
  },
  {
    "keywords": [
      "mazhavil manorama hd"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_MAZHAVIL_MANORAMA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "ptc punjabi"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_PTC_PUNJABI/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "ptc punjabi gold"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_PTC_PUNJABI_GOLD/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "roja tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/rojatv.png"
  },
  {
    "keywords": [
      "subin tv"
    ],
    "logo": "https://www.subintv.in/SUBINLOGO.png"
  },
  {
    "keywords": [
      "suriya tv"
    ],
    "logo": "https://play-lh.googleusercontent.com/izaQp_W1pZqa_fKqG0fGcWv9ls74BpIE-W1yOZBiw-gG0bSrcBNIvw3EY9SR4RyQYAlT=w480-h960-rw"
  },
  {
    "keywords": [
      "telugu one"
    ],
    "logo": "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/IN400058AF_20260311T004509SQUARE.png"
  },
  {
    "keywords": [
      "raj digital plus"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_DIGITAL_PLUS/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "roja movies"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/rojamovies.png"
  },
  {
    "keywords": [
      "thalaa tv"
    ],
    "logo": "https://d229kpbsb5jevy.cloudfront.net/yuppfast/content/common/channel/logos/thalaa-tv.png"
  },
  {
    "keywords": [
      "tolly tv"
    ],
    "logo": "https://d229kpbsb5jevy.cloudfront.net/yuppfast/content/common/channel/logos/aumnrs.png"
  },
  {
    "keywords": [
      "9x tashan"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9X_TASHAN/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "9x jalwa"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9X_JALWA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "9x jalwa hd"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9X_JALWA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "9x jhakaas"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/9xjhakaas.png"
  },
  {
    "keywords": [
      "9xm"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9XM/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "sangeet bangla"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SANGEET_BANGLA/images/LOGO_HD/LOGO_HD_image.png"
  },
  {
    "keywords": [
      "aaryaa tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/aryatvtamil.png"
  },
  {
    "keywords": [
      "etv music"
    ],
    "logo": "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/IN4900002RV_20250811T033455SQUARE.png"
  },
  {
    "keywords": [
      "punjabi hits"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_PUNJABI_HITS/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "qello concerts"
    ],
    "logo": "https://i.imgur.com/IRyFTWq.png"
  },
  {
    "keywords": [
      "raj musix tamil"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_MUSIX_TAMIL/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "sana plus"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/SANA-PLUS-LOGO_2000_X_1125_Transpharent.png"
  },
  {
    "keywords": [
      "stingray classic rock"
    ],
    "logo": "https://i.imgur.com/FBgu8yB.png"
  },
  {
    "keywords": [
      "stingray djazz"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Stingray_Djazz.png/960px-Stingray_Djazz.png"
  },
  {
    "keywords": [
      "stingray easy listening"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Stingray_Music_logo.svg/960px-Stingray_Music_logo.svg.png"
  },
  {
    "keywords": [
      "stingray naturescape"
    ],
    "logo": "https://i.imgur.com/882kd90.png"
  },
  {
    "keywords": [
      "stingray the spa"
    ],
    "logo": "https://i.imgur.com/ywAN923.png"
  },
  {
    "keywords": [
      "stingray kpop"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Stingray_Music_logo.svg/960px-Stingray_Music_logo.svg.png"
  },
  {
    "keywords": [
      "ultimate tv"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/U-Tv-logo_2000_X_1125_Transpharent.png"
  },
  {
    "keywords": [
      "doraemon tv"
    ],
    "logo": "https://i.imgur.com/zJuSbmU.png"
  },
  {
    "keywords": [
      "mr bean animated"
    ],
    "logo": "https://static.wikia.nocookie.net/logopedia/images/2/25/Mr._Bean_Animated_Series_stacked_logo.png"
  },
  {
    "keywords": [
      "cartoon network"
    ],
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/960px-Cartoon_Network_2010_logo.svg.png"
  },
  {
    "keywords": [
      "aaj tak hd"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_AAJ_TAK/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "abp news"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ABP_NEWS/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "abp ananda"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ABP_ANANDA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "abp asmita"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ABP_ASMITA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "abp ganga"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/DISTROTV/LIVECHANNEL/66698920bac4421ebc533666/images/logo_20231219_183752_65.png"
  },
  {
    "keywords": [
      "akd calcutta news"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/Calcutta%20News.png"
  },
  {
    "keywords": [
      "amarujala"
    ],
    "logo": "https://i.imgur.com/ndQ8LZp.png"
  },
  {
    "keywords": [
      "asianet suvarna news"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ASIANET_SUVARNA_NEWS/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "bharat24"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_BHARAT_24/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "chardikla gurbaani tv"
    ],
    "logo": "https://i.imgur.com/NXD8CPq.png"
  },
  {
    "keywords": [
      "chardikla time tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_CHARDIKLA_TIME_TV/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "chardikla time tv na"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_CHARDIKLA_TIME_TV/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "ctvn akd plus"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CTVN_AKD_Plus.png"
  },
  {
    "keywords": [
      "dd news hd"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_INDIA_HD/images/LOGO_HD/LOGO_HD_image.png"
  },
  {
    "keywords": [
      "etv news"
    ],
    "logo": "https://i.imgur.com/qTO3g37.png"
  },
  {
    "keywords": [
      "global punjab"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Global_Punjab.png"
  },
  {
    "keywords": [
      "guarantee news"
    ],
    "logo": "https://media.licdn.com/dms/image/v2/D560BAQHYZzbGJ7ViZA/company-logo_200_200/company-logo_200_200/0/1728031377890?e=2147483647&v=beta&t=bIsZgNUCcg0M_-Zqeu5wKYgBt_1-pI798X9lP5CxhTM"
  },
  {
    "keywords": [
      "hamdard tv"
    ],
    "logo": "https://i.ibb.co/JcD2xck/logo-hamda.png"
  },
  {
    "keywords": [
      "india daily live"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/IndiaDaily24x7_2025_transparent.png"
  },
  {
    "keywords": [
      "kannur vision"
    ],
    "logo": "https://i.imgur.com/FCXqPer.png"
  },
  {
    "keywords": [
      "living india news"
    ],
    "logo": "https://i.imgur.com/6iMo6kt.png"
  },
  {
    "keywords": [
      "ndtv marathi"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_MARATHI/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "ndtv rajasthan"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_RAJASTHAN/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news9live"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS9/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 bangla"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_BANGLA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 bihar jharkhand"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_BIHAR_JHARKHAND/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 delhi ncr jk"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/News18JKLH.png"
  },
  {
    "keywords": [
      "news18 gujarati"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_GUJARATI/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 india"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_BANGLA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 kannada"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_KANNADA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 kerala"
    ],
    "logo": "https://i.postimg.cc/XqPvDXrG/News18_Kerala.png"
  },
  {
    "keywords": [
      "news18 marathi"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_LOKMAT/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 odia"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_ODIA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 punjab haryana hp"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_PUNJAB_HARYANA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 rajasthan"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_RAJASTHAN/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 tamil nadu"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_TAMIL_NADU/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "news18 urdu"
    ],
    "logo": "https://i.imgur.com/8xnwMRR.png"
  },
  {
    "keywords": [
      "news nation"
    ],
    "logo": "https://i.imgur.com/h3TY38F.png"
  },
  {
    "keywords": [
      "prime9 news"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_CHANNEL_36_UP_UK/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "prudent media"
    ],
    "logo": "https://i.imgur.com/DG0x4UD.png"
  },
  {
    "keywords": [
      "republic bharat"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_R_BHARAT/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "republic kannada"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RSYMDOTKANNADA/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "republic tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_REPUBLIC_TV/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "rozana spokesman"
    ],
    "logo": "https://www.rozanaspokesman.in/images/logospokesman.png"
  },
  {
    "keywords": [
      "rt india"
    ],
    "logo": "https://i.imgur.com/55SK22l.png"
  },
  {
    "keywords": [
      "samay kolkata"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Samay_Kolkata.png"
  },
  {
    "keywords": [
      "sudarshan news"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SUDARSHAN_NEWS/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "swatantra tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Swatantra_News.png"
  },
  {
    "keywords": [
      "times now navbharat"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/TIMESPLAY/LIVECHANNEL/6904ba4339f3b175376a61e0/images/LOGO_HD/LOGO_HD_asIWhlk80_TimesNowBharat1_1.png"
  },
  {
    "keywords": [
      "tnp news"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/TNP_News.png"
  },
  {
    "keywords": [
      "zee news"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Zee_Kannada_News.png"
  },
  {
    "keywords": [
      "peace tv bangla"
    ],
    "logo": "https://i.imgur.com/1ztVXUi.png"
  },
  {
    "keywords": [
      "anand tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Anand_TV.png"
  },
  {
    "keywords": [
      "channel divya"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Divya_TV.png"
  },
  {
    "keywords": [
      "fateh tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Fateh_TV.png"
  },
  {
    "keywords": [
      "hebron tv"
    ],
    "logo": "https://i0.wp.com/hebrontv.in/wp-content/uploads/2023/11/hebron-.png?w=512"
  },
  {
    "keywords": [
      "mahaa bhakti"
    ],
    "logo": "https://yt3.googleusercontent.com/OWECRvCVJh-dXU2MTRZhMRIDvFvcWan0YMoWWfXsM5_WEHobQy2QoHQbGr7AZUXzMOByTMAXbg=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    "keywords": [
      "mercy tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Rujumargam_TV.png"
  },
  {
    "keywords": [
      "pmc telugu"
    ],
    "logo": "https://www.pmconlinetv.com/wp-content/uploads/2023/03/PMC-Telugu-Logo-85x85.png"
  },
  {
    "keywords": [
      "salvation tv"
    ],
    "logo": "https://content.jdmagicbox.com/comp/bangalore/l5/080pxx80.xx80.150207120517.e4l5/catalogue/salvation-tv-network-pvt-m-g-road-bangalore-religious-organizations-1sabn2d.jpg"
  },
  {
    "keywords": [
      "sanskar web tv"
    ],
    "logo": "https://i.imgur.com/mu2B6hw.png"
  },
  {
    "keywords": [
      "sanskar tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SANSKAR/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "satsang tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SATSANG/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "satsang web tv"
    ],
    "logo": "https://i.imgur.com/40kNu1w.png"
  },
  {
    "keywords": [
      "shalom tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SHALOM_TV/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "svbc 2"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/SVBC%202.png"
  },
  {
    "keywords": [
      "svbc 4"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/SVBC4.png"
  },
  {
    "keywords": [
      "total bhakti"
    ],
    "logo": "https://i.imgur.com/LPwRdmF.png"
  },
  {
    "keywords": [
      "cnbc tv18"
    ],
    "logo": "https://www.cnbctv18.com/static/images/cnbc-new-logo/cnbc-new-livetv.svg"
  },
  {
    "keywords": [
      "cnbc tv18 prime hd"
    ],
    "logo": "https://www.cnbctv18.com/static/images/cnbc-new-logo/cnbc-prime-livetv.svg"
  },
  {
    "keywords": [
      "cnbc awaaz"
    ],
    "logo": "https://www.cnbctv18.com/static/images/cnbc-new-logo/cnbc-awaaz-livetv.svg"
  },
  {
    "keywords": [
      "cnbc bajar"
    ],
    "logo": "https://www.cnbctv18.com/static/images/cnbc-new-logo/cnbc-gujrati-livetv.svg"
  },
  {
    "keywords": [
      "ndtv profit"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_PROFIT_PRIME/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "dd india"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_INDIA_HD/images/LOGO_HD/LOGO_HD_image.png"
  },
  {
    "keywords": [
      "dd tamil"
    ],
    "logo": "https://yt3.googleusercontent.com/gOPDl0p0Ssungy3AfKG9MNHeW1QEwRmoFw0_dwDsUulDPE5Hv9nicA3MCjYyzYInzw8kbd5C=s900-c-k-c0x00ffffff-no-rj"
  },
  {
    "keywords": [
      "metro tv"
    ],
    "logo": "https://i.imgur.com/D4nRp62.png"
  },
  {
    "keywords": [
      "nkr tv kannada"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NKRTV.png"
  },
  {
    "keywords": [
      "tv brics english"
    ],
    "logo": "https://i.imgur.com/8rKNuS6.png"
  },
  {
    "keywords": [
      "pravasi channel"
    ],
    "logo": "https://i.imgur.com/1dHarb7.png"
  },
  {
    "keywords": [
      "shekinah tv"
    ],
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/SHEKINAH-LOGO_2000_X_1125_Transpharent.png"
  },
  {
    "keywords": [
      "shubh tv"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SHUBH_TV/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "tamilan tv"
    ],
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Tamilan_Television.png"
  },
  {
    "keywords": [
      "history tv18 hd"
    ],
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_HISTORY_TV18/images/LOGO_HD/image.png"
  },
  {
    "keywords": [
      "inwild"
    ],
    "logo": "https://cdn.uc.assets.prezly.com/92770c71-9d6f-400f-8311-38e9cfec52c2/InWild_landscape-green.png"
  },
  {
    "keywords": [
      "inwonder"
    ],
    "logo": "https://cdn.uc.assets.prezly.com/f12e798d-6da4-46e1-8ec5-e391d6762659/InWonder_portrait-purple.png"
  },
  {
    "keywords": [
      "adventure earth"
    ],
    "logo": "https://i.imgur.com/94Pq9Io.png"
  },
  {
    "keywords": [
      "etv comedy"
    ],
    "logo": "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/IN4900003U3_20251106T195117SQUARE.png"
  },
  {
    "keywords": [
      "2tv sport"
    ],
    "logo": "https://i.imgur.com/sZUIhGc.png"
  },
  {
    "keywords": [
      "unknown"
    ],
    "logo": "https://i.imgur.com/dAO9llk.png"
  },
  {
    "keywords": [
      "rajdhani tv"
    ],
    "logo": "https://i.imgur.com/MBm2gPz.jpeg"
  },
  {
    "keywords": [
      "rs news"
    ],
    "logo": "https://i.imgur.com/FSkYLPK.png"
  },
  {
    "keywords": [
      "rs sports 1"
    ],
    "logo": "https://i.imgur.com/CZy4Cqi.png"
  },
  {
    "keywords": [
      "rs sports 2"
    ],
    "logo": "https://i.imgur.com/FJBL6zI.png"
  },
  {
    "keywords": [
      "rs sports 3"
    ],
    "logo": "https://i.imgur.com/YRiulCU.png"
  },
  {
    "keywords": [
      "rs sports 4"
    ],
    "logo": "https://i.imgur.com/5KlJk5n.png"
  },
  {
    "keywords": [
      "rs sports 5"
    ],
    "logo": "https://i.imgur.com/SyXVJdM.png"
  },
  {
    "keywords": [
      "rs tv"
    ],
    "logo": "https://i.imgur.com/FSkYLPK.png"
  },
  {
    "keywords": [
      "rs news web"
    ],
    "logo": "https://i.ibb.co/WzLwj3X/IMG-20230703-155036.jpg"
  },
  {
    "keywords": [
      "rs premiere"
    ],
    "logo": "https://i.imgur.com/BURPHzI.png"
  },
  {
    "keywords": [
      "rs premiere 2"
    ],
    "logo": "https://i.imgur.com/BURPHzI.png"
  },
  {
    "keywords": [
      "rs premiere 3"
    ],
    "logo": "https://i.imgur.com/BURPHzI.png"
  },
  {
    "keywords": [
      "rs premiere 4"
    ],
    "logo": "https://i.imgur.com/BURPHzI.png"
  },
  {
    "keywords": [
      "azteca 7a"
    ],
    "logo": "https://i.imgur.com/UtFXjIn.png"
  },
  {
    "keywords": [
      "masr"
    ],
    "logo": "https://i.ibb.co/JHxGNmf/logo-63c09708736e15-74858373-64636840.png"
  },
  {
    "keywords": [
      "azteca 7"
    ],
    "logo": "https://i.imgur.com/UtFXjIn.png"
  }
];

export function getChannelLogo(name = '', m3uLogo = '') {
  // If we have a valid M3U logo URL, use it first
  if (m3uLogo && m3uLogo.trim().startsWith('http')) {
    return m3uLogo.trim();
  }

  // Try to match search terms in our official logo map
  const nameLower = name.toLowerCase();
  const matched = LOGO_MAP.find(item => 
    item.keywords.some(keyword => nameLower.includes(keyword))
  );

  if (matched) {
    return matched.logo;
  }

  // Default fallback to a high-quality TV broadcast network logo
  return 'https://upload.wikimedia.org/wikipedia/commons/3/34/TVP_Sport_logo_2021.svg';
}
