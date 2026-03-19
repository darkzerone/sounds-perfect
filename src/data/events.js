import { Briefcase, Users, Music, GlassWater } from 'lucide-react';

export const eventsData = [
  {
    id: 'zakelijke-evenementen',
    title: 'Zakelijke evenementen',
    description: 'Presentaties, congressen, vergaderingen en bedrijfsfeesten. Wij verzorgen de volledige technische realisatie met een professionele uitstraling die naadloos aansluit bij uw merk.',
    icon: Briefcase,
    features: [
      'Kraakheldere spraakversterking voor elke zaalgrootte',
      'Strakke beeldpresentaties op schermen of beamers',
      'Sfeervolle verlichting in uw bedrijfskleuren',
      'Discreet weggewerkte bekabeling en techniek'
    ],
    sections: [
      {
        title: 'Beurs, presentatie, congres of een ander denkbaar zakelijk event',
        paragraphs: [
          'Vaak zijn op deze events licht, geluid en beeld faciliteiten nodig. Meestal hebben de gehuurde locatie\'s niet de geschikte apparatuur in huis. Hiervoor kunt u Sounds-Perfect inschakelen.',
          'Wij hebben alle denkbare apparatuur en technici in huis om uw event tot een succes te maken. U en uw publiek staan bij ons centraal en alles is eigenlijk wel mogelijk. "Nee helaas" kennen wij niet, wij denken in oplossingen! Hierdoor is vaak het eindresultaat boven verwachting.',
          'Nieuwsgierig geworden? Bel ons op <a href="tel:0302931212">030-2931212</a> of stuur een bericht via het <a href="/contact">contactformulier</a>. U zult versteld staan van onze scherpe tarieven.'
        ]
      }
    ],
    image: '/images/zakelijk-hero.png'
  },
  {
    id: 'publieke-evenementen',
    title: 'Publieke evenementen',
    description: 'Van braderieën en sportevenementen tot openingen en wijkfeesten. Wij bieden betrouwbare 100-volt omroepsystemen, mobiele stroomvoorzieningen en overdekte podia voor buitenlocaties.',
    icon: Users,
    features: [
      'Omroepinstallaties met groot bereik voor openbare plekken',
      'Weerbestendige apparatuur en overkappingen',
      'Overleg met overheden m.b.t. decibel grenzen',
      'Oplossingen voor zware weeromstandigheden'
    ],
    sections: [
      {
        title: 'Sportevenementen, braderieën, modeshows, carnaval',
        paragraphs: [
          'Bij publieke evenementen moet u denken aan sportevenementen, braderieën, modeshows, carnaval, sinterklaasfeest en nog veel meer. Dit soort evenementen zijn vaak openbaar en kosteloos voor het publiek. Hierdoor is er vaak een beperkt budget voor het inhuren van techniek.',
          'Sounds-Perfect helpt u om het meeste uit uw budget te halen. Naast geluid- en lichtsystemen beschikken wij over podia voor binnen en buiten. Het voordeel van het in huis hebben van deze materialen is dat we een scherp tarief kunnen hanteren bij verhuur.',
          'Bel ons op <a href="tel:0302931212">030-2931212</a> of stuur een bericht via het <a href="/contact">contactformulier</a>. U zult er profijt van hebben!'
        ]
      }
    ],
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'festival-podium-dance',
    title: 'Festival, podium & dance',
    description: 'Diepe bassen, spectaculaire lichtshows en grote podia. Voor dance events, live muziek en festivals leveren wij de zware jongens uit de industrie voor de ultieme beleving.',
    icon: Music,
    features: [
      'Zware Line-array systemen en krachtige subwoofers',
      'Indrukwekkende lichtontwerpen met movingheads en lasers',
      'Uitgebreide backline support en monitor systemen voor DJ\'s/bands',
      'Ondersteuning van ervaren stagemanagers en technici'
    ],
    sections: [
      {
        title: 'Zware jongens voor de ultieme festival & dance beleving.',
        paragraphs: [
          'Bij festivals en concerten staat de muziek centraal, gedreven door een spectaculaire licht- en videoshow. Wij werken uitsluitend met toonaangevende audiomerken (EV, Acoustic Line) die kicken waar het moet, zodat artiesten comfortabel performen en je bezoekers een topnacht beleven. Kom gerust even langs op de zaak voor een brainstorm, de bonenkoffie staat al klaar!',
        ]
      }
    ],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'feesten-partijen',
    title: 'Feesten & partijen',
    description: 'Bruiloften, verjaardagen, of jubilea? Wij leggen de basis voor een onvergetelijk feest met een perfect afgestemde geluidsset en sfeervolle verlichting voor de dansvloer.',
    icon: GlassWater,
    features: [
      'Compacte, stijlvolle geluidssets die overal passen',
      'Inclusief sfeerverlichting en party-effecten',
      'Plug & Play systemen voor uw eigen DJ of afspeellijst',
      'Verlichte DJ-booths voor een extra luxe uitstraling'
    ],
    sections: [
      {
        title: 'Sfeervolle omlijsting voor een feest om nooit te vergeten.',
        paragraphs: [
          'Bruiloft, verjaardag of jubileum? Wij leggen de perfecte technische basis voor jouw dansvloer. Onze plug-and-play party-sets combineren goed geluid met sfeereffecten die intuïtief werken, zodat jij ontspannen kunt feesten met je gasten. Van een los lichteffect tot compleet verzorgde DJ-shows, alles is mogelijk bij ons.',
        ]
      }
    ],
    image: '/images/feesten-hero.png'
  }
];

export const getEventById = (id) => eventsData.find(event => event.id === id);
