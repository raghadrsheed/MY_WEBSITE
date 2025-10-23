// ==========================
//  كود موحد لكل الصفحات (لغة + وضع ليلي)
// ==========================
(function () {
  const langFlag = document.getElementById('langFlag');
  const themeToggle = document.getElementById('themeToggle');
  let currentLang = localStorage.getItem('siteLang') || 'ar';
  let currentTheme = localStorage.getItem('theme') || 'light';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      if (themeToggle) themeToggle.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      if (themeToggle) themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
  }

  function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('siteLang', currentLang);
    location.reload();
  }

  function applyLanguageToElements() {
    document.documentElement.lang = currentLang;
    document.body.dir = currentLang === 'en' ? 'ltr' : 'rtl';
    document.body.style.textAlign = currentLang === 'en' ? 'left' : 'right';

    if (langFlag) {
      langFlag.src = currentLang === 'en'
        ? 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
        : 'assets/Images/syria.png';
      langFlag.addEventListener('click', toggleLanguage);
    }

    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      el.textContent = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
      if (el.placeholder !== undefined && el.hasAttribute('data-en') && el.hasAttribute('data-ar')) {
        el.placeholder = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
      }
    });
  }

  applyLanguageToElements();
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
    });
  }
})();

// ==========================
//  صفحة تواصل معنا
// ==========================
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const alertContainer = document.getElementById('alertContainer');
  const staticEls = {
    pageTitle: document.getElementById('page-title'),
    lblName: document.getElementById('lbl-name'),
    lblEmail: document.getElementById('lbl-email'),
    lblMessage: document.getElementById('lbl-message'),
    submitBtn: document.getElementById('submitBtn'),
    altContact: document.getElementById('alt-contact'),
    footerText: document.getElementById('footer-text')
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const currentLang = localStorage.getItem('siteLang') || 'ar';

  function applyLanguage() {
    if (currentLang === 'en') {
      staticEls.pageTitle.textContent = 'Contact Us';
      staticEls.lblName.textContent = 'Full Name';
      staticEls.lblEmail.textContent = 'Email';
      staticEls.lblMessage.textContent = 'Message';
      staticEls.submitBtn.textContent = 'Send Message';
      staticEls.altContact.textContent = 'You can also contact us via:';
      staticEls.footerText.textContent = '© 2025 All rights reserved';
    } else {
      staticEls.pageTitle.textContent = 'تواصل معنا';
      staticEls.lblName.textContent = 'الاسم الكامل';
      staticEls.lblEmail.textContent = 'البريد الإلكتروني';
      staticEls.lblMessage.textContent = 'الرسالة';
      staticEls.submitBtn.textContent = 'إرسال الرسالة';
      staticEls.altContact.textContent = 'يمكنك أيضًا التواصل معنا عبر:';
      staticEls.footerText.textContent = 'جميع الحقوق محفوظة © 2025';
    }
  }

  applyLanguage();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showAlert(currentLang === 'ar' ? 'يرجى تعبئة كل الحقول.' : 'Please fill in all fields.', 'danger');
      return;
    }
    if (!emailRe.test(email)) {
      showAlert(currentLang === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة.' : 'Invalid email format.', 'danger');
      return;
    }

    showAlert(currentLang === 'ar' ? 'تم إرسال الرسالة بنجاح 🎉' : 'Message sent successfully 🎉', 'success');
    form.reset();
  });

  function showAlert(message, type = 'info') {
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }
})();

// ==========================
//  صفحة من نحن
// ==========================
(function () {
  const aboutSection = document.getElementById('about-title');
  if (!aboutSection) return;

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const staticEls = {
    aboutTitle: document.getElementById('about-title'),
    aboutText: document.getElementById('about-text'),
    missionTitle: document.getElementById('mission-title'),
    missionText: document.getElementById('mission-text'),
    visionTitle: document.getElementById('vision-title'),
    visionText: document.getElementById('vision-text'),
    teamTitle: document.getElementById('team-title'),
    policyTitle: document.getElementById('policy-title'),
    policyList: document.getElementById('policy-list'),
    footerText: document.getElementById('footer-text')
  };

  const teamMembers = document.querySelectorAll('.team-card');
  const currentLang = localStorage.getItem('siteLang') || 'ar';

  function applyLanguage() {
    if (currentLang === 'en') {
      navLinks.forEach(el => el.textContent = el.getAttribute('data-en'));
      staticEls.aboutTitle.textContent = 'About Us';
      staticEls.aboutText.textContent = 'CityEvents is a comprehensive Syrian digital platform that brings together cultural, artistic, and social events in one place, aiming to connect people with activities that inspire and enrich their daily lives.';
      staticEls.missionTitle.textContent = 'Mission';
      staticEls.missionText.textContent = 'To create an interactive digital space that enables everyone to easily discover events and activities that enhance cultural and social life.';
      staticEls.visionTitle.textContent = 'Vision';
      staticEls.visionText.textContent = 'To become Syria’s leading digital platform for discovering events and connecting communities across the governorates.';
      staticEls.teamTitle.textContent = 'Our Team';
      staticEls.policyTitle.textContent = 'Publishing and Event Submission Policies';
      staticEls.footerText.textContent = '© 2025 All rights reserved';

      teamMembers.forEach(card => {
        const name = card.querySelector('.member-name');
        const role = card.querySelector('.member-role');
        if (name && role) {
          name.textContent = name.getAttribute('data-en');
          role.textContent = role.getAttribute('data-en');
        }
      });

      updatePolicyList([
        'The event must be real and from a reliable source.',
        'Only events that promote culture and knowledge positively are accepted.',
        'Publishing any offensive or inappropriate content is prohibited.',
        'The event must include accurate and clear details about location, time, and content.',
        'The platform reserves the right to edit or remove any event that violates the standards.'
      ]);
    } else {
      navLinks.forEach(el => el.textContent = el.getAttribute('data-ar'));
      staticEls.aboutTitle.textContent = 'من نحن';
      staticEls.aboutText.textContent = 'منصة CityEvents هي دليل رقمي سوري شامل يجمع الفعاليات والأنشطة الثقافية والفنية والاجتماعية في مكان واحد، بهدف ربط الناس بالفعاليات التي تلهمهم وتثري حياتهم اليومية.';
      staticEls.missionTitle.textContent = 'الرسالة';
      staticEls.missionText.textContent = 'خلق مساحة رقمية تفاعلية تُسهِّل على الجميع اكتشاف الفعاليات والأنشطة التي تعزز الحياة الثقافية والاجتماعية.';
      staticEls.visionTitle.textContent = 'الرؤية';
      staticEls.visionText.textContent = 'أن تصبح CityEvents المنصة السورية الأولى لاكتشاف الفعاليات وربط المجتمعات عبر المحافظات.';
      staticEls.teamTitle.textContent = 'فريقنا';
      staticEls.policyTitle.textContent = 'سياسات النشر وتقديم الفعاليات';
      staticEls.footerText.textContent = 'جميع الحقوق محفوظة © 2025';

      teamMembers.forEach(card => {
        const name = card.querySelector('.member-name');
        const role = card.querySelector('.member-role');
        if (name && role) {
          name.textContent = name.getAttribute('data-ar');
          role.textContent = role.getAttribute('data-ar');
        }
      });

      updatePolicyList([
        'يجب أن تكون الفعالية حقيقية وموثوقة المصدر.',
        'تُقبل فقط الفعاليات التي تساهم في نشر الثقافة والمعرفة بشكل إيجابي.',
        'يُمنع نشر أي محتوى مسيء أو يتعارض مع القيم العامة.',
        'يجب أن تتضمّن الفعالية تفاصيل دقيقة وواضحة عن المكان والزمان والمحتوى.',
        'تحتفظ المنصة بحق تعديل أو حذف أي فعالية تخالف المعايير.'
      ]);
    }
  }

  function updatePolicyList(items) {
    if (!staticEls.policyList) return;
    staticEls.policyList.innerHTML = '';
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      staticEls.policyList.appendChild(li);
    });
  }

  applyLanguage();
})();

// ==========================
//  الصفحة الرئيسية (home)
// ==========================
(function () {
  const currentLang = localStorage.getItem('siteLang') || 'ar';
  const latestContainer = document.getElementById('latestEvents');
  if (!latestContainer) return;

  const events = [
    { titleAr: 'فرقة ألوندرا الموسيقية', titleEn: 'Alondra Music Band', cat: 'music', img: 'assets/Images/alon1.jpg' },
    { titleAr: 'فرقة درجها', titleEn: 'Darijha Band', cat: 'sport', img: 'assets/Images/darj1.jpg' },
    { titleAr: 'مسابقة القارئ الصغير', titleEn: 'Young Reader Competition', cat: 'culture', img: 'assets/Images/Qar1.jpg' },
    { titleAr: 'مهرجان الفن التشكيلي السنوي الخامس', titleEn: '5th Annual Fine Arts Festival', cat: 'art', img: 'assets/Images/fn1.jpg' },
    { titleAr: 'بطولة الجمهورية للكاراتيه', titleEn: 'Republic Karate Championship', cat: 'sport', img: 'assets/Images/kart1.jpg' },
    { titleAr: 'ليالي حلب الثقافية', titleEn: 'Aleppo Cultural Nights', cat: 'culture', img: 'assets/Images/aleppo1.jpg' },
    { titleAr: 'دار الأوبرا', titleEn: 'Opera House', cat: 'music', img: 'assets/Images/opera1.jpg' },
    { titleAr: 'معرض الزهور الدولي في دمشق', titleEn: 'International Flower Exhibition', cat: 'art', img: 'assets/Images/zhor1.jpg' }
  ];

  const filterBtns = document.querySelectorAll('.filter-btn');

  function displayEvents(filter) {
    latestContainer.innerHTML = '';
    const filtered = filter ? events.filter(e => e.cat === filter) : events;
    filtered.slice(-3).forEach(ev => {
      latestContainer.innerHTML += `
        <div class="col-md-4">
          <div class="event-card p-3">
            <img src="${ev.img}" class="w-100" alt="">
            <h5 class="mt-3" data-en="${ev.titleEn}" data-ar="${ev.titleAr}">${(currentLang === 'en' ? ev.titleEn : ev.titleAr)}</h5>
          </div>
        </div>`;
    });
  }

  displayEvents();

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayEvents(btn.dataset.cat);
    });
  });
})();

// ==========================
//  صفحة الفعاليات (events)
// ==========================
(function () {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const dateFilter = document.getElementById('dateFilter');
  const currentLang = localStorage.getItem('siteLang') || 'ar';

  const events = [
    { titleAr: 'فرقة ألوندرا الموسيقية', titleEn: 'Alondra Music Band', cat: 'music', descAr:'فرقة موسيقية تضم عازفين ومغنيين المحافظة لاحياء حفلات تراثية', descEn:'A musical band comprising musicians and singers from the governorate to perform traditional concerts.', placeAr:'السويداء', placeEn:'Sweida', date:'2020-02-02', img:'assets/Images/alon1.jpg' },
    { titleAr: 'بطولة الجمهورية للكاراتيه', titleEn: 'Republic Championship for Karate Clubs and Sports Houses', cat:'sport', descAr:'نُظّمت البطولة من قِبل الاتحاد السوري للكاراتيه، وتحت إشراف وزارة الشباب والرياضة السورية', descEn:'The tournament was organized by the Syrian Karate Federation, under the supervision of the Syrian Ministry of Youth and Sports.', placeAr:'دمشق', placeEn:'Damascus', date:'2024-06-02', img:'assets/Images/kart1.jpg' },
    { titleAr: 'ليالي حلب الثقافية', titleEn:'Aleppo Cultural Nights', cat:'culture', descAr:'حملت بين طياتها جسوراً بين إرث المدينة العريق والإبداع المعاصر، من خلال أمسيات شعرية وموسيقية ومعارض فنية وتراثية.', descEn:'It bridges the city\'s rich heritage with contemporary creativity through poetry and music evenings, art and heritage exhibitions.', placeAr:'حلب', placeEn:'Aleppo', date:'2025-09-05', img:'assets/Images/aleppo1.jpg' },
    { titleAr:'مهرجان الفن التشكيلي السنوي الخامس', titleEn:'The Fifth Annual Fine Arts Festival', cat:'art', descAr:'يضم المهرجان 51 لوحة فنية متنوعة، قدمها 26 فنانًا بتقنيات وأحجام مختلفة.', descEn:'The exhibition includes 51 diverse paintings, presented by 26 artists in different techniques and sizes.', placeAr:'دمشق', placeEn:'Damascus', date:'2022-10-11', img:'assets/Images/fn1.jpg' },
    { titleAr:'دار الأوبرا', titleEn:'Opera House', cat:'music', descAr:'عرض مسرحيات وأعمال درامية وفرق الأوركسترا.', descEn:'Presenting plays, dramas and orchestras.', placeAr:'دمشق', placeEn:'Damascus', date:'2025-06-01', img:'assets/Images/opera1.jpg' },
    { titleAr:'فرقة درجها', titleEn:'Darijha Band', cat:'sport', descAr:'فريق يضم جميع راكبين الدراجة تأكيدا على اهمية الرياضة في الحياة', descEn:'A team that includes all cyclists, emphasizing the importance of sport in life.', placeAr:'السويداء', placeEn:'Sweida', date:'2025-03-18', img:'assets/Images/darj1.jpg' },
    { titleAr:'مسابقة القارئ الصغير', titleEn:'Young Reader Competition', cat:'culture', descAr:'مسابقة سنوية للأطفال تأكيدا على أهمية القراءة في خلق جيل واعي', descEn:'An annual competition for children to emphasize the importance of reading in creating an aware generation.', placeAr:'السويداء', placeEn:'Sweida', date:'2023-02-10', img:'assets/Images/Qar1.jpg' },
    { titleAr:'معرض الزهور الدولي في دمشق', titleEn:'International Flower Fair in Damascus', cat:'art', descAr:'شمل المعرض مجموعة من الفعاليات الثقافية والفنية والترفيهية، بالإضافة إلى عروض مسرحية للأطفال.', descEn:'The Fair included cultural, artistic, and entertainment events, plus children’s theater shows.', placeAr:'دمشق', placeEn:'Damascus', date:'2023-06-22', img:'assets/Images/zhor1.jpg' }
  ];

  function renderCards(lang) {
    grid.innerHTML='';
    let list = [...events];
    if(categoryFilter && categoryFilter.value!=='all') list=list.filter(e=>e.cat===categoryFilter.value);
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    if(term) list=list.filter(e=>e.titleAr.toLowerCase().includes(term) || e.titleEn.toLowerCase().includes(term));
    if(dateFilter){
      list.sort((a,b)=> dateFilter.value==='newest'? new Date(b.date)-new Date(a.date) : new Date(a.date)-new Date(b.date));
    }
    list.forEach((e,index)=>{
      const title = lang==='ar'?e.titleAr:e.titleEn;
      const desc = lang==='ar'?e.descAr:e.descEn;
      const place = lang==='ar'?e.placeAr:e.placeEn;
      const catName = { music:'موسيقى', sport:'رياضة', culture:'ثقافة', art:'فنون' };
      const catText = lang==='ar'?catName[e.cat]:({music:'Music', sport:'Sports', culture:'Culture', art:'Art'})[e.cat];
      grid.innerHTML+=`
        <div class="col-md-4">
          <div class="event-card p-3 shadow-sm">
            <img src="${e.img}" alt="${title}" class="event-img">
            <h5 class="mt-3">${title}</h5>
            <p class="event-meta">${catText}</p>
            <p>${desc}</p>
            <p class="event-meta">${lang==='ar'?'المكان:':'Place:'} ${place}</p>
            <p class="event-meta">${lang==='ar'?'التاريخ:':'Date:'} ${e.date}</p>
            <a href="event.html?id=${index}" class="btn btn-outline-primary w-100 mt-2">${lang==='ar'?'التفاصيل':'Details'}</a>
          </div>
        </div>
      `;
    });
  }

  if(searchInput) searchInput.addEventListener('input',()=>renderCards(currentLang));
  if(categoryFilter) categoryFilter.addEventListener('change',()=>renderCards(currentLang));
  if(dateFilter) dateFilter.addEventListener('change',()=>renderCards(currentLang));

  renderCards(currentLang);
})();

// ==========================
//  صفحة تفاصيل الفعالية (event)
// ==========================

(function(){
  const container = document.getElementById('eventDetails');

  const events = [
    { id: 7, titleAr:'فرقة ألوندرا الموسيقية', titleEn:'Alondra Music Band', cat:'music', descAr:'فرقة موسيقية تضم عازفين ومغنيين المحافظة لإحياء حفلات تراثية.', descEn:'A musical band comprising musicians and singers from the governorate to perform traditional concerts.', placeAr:'السويداء', placeEn:'Sweida', date:'2020-02-02', img:'assets/Images/alon1.jpg', gallery:['assets/Images/alon1.jpg','assets/Images/alon2.jpg','assets/Images/alon3.jpg','assets/Images/alon4.jpg'], map:'assets/Images/alonmap.jpg'},
    { id: 3, titleAr:'بطولة الجمهورية للأندية والبيوتات الرياضية للكاراتيه', titleEn:'Republic Championship for Karate Clubs and Sports Houses', cat:'sport', descAr:'نُظّمت البطولة من قِبل الاتحاد السوري للكاراتيه، وتحت إشراف وزارة الشباب والرياضة السورية.', descEn:'The tournament was organized by the Syrian Karate Federation, under the supervision of the Syrian Ministry of Youth and Sports.', placeAr:'دمشق', placeEn:'Damascus', date:'2024-06-02', img:'assets/Images/kart1.jpg', gallery:['assets/Images/kart1.jpg','assets/Images/kart2.jpg','assets/Images/kart3.jpg','assets/Images/kart4.jpg'], map:'assets/Images/kartmap.jpg'},
    { id: 0, titleAr:'ليالي حلب الثقافية', titleEn:'Aleppo Cultural Nights', cat:'culture', descAr:'حملت بين طياتها جسوراً بين إرث المدينة العريق والإبداع المعاصر، من خلال أمسيات شعرية وموسيقية ومعارض فنية وتراثية.', descEn:'It bridges the city\'s rich heritage with contemporary creativity through poetry and music evenings, art and heritage exhibitions.', placeAr:'حلب', placeEn:'Aleppo', date:'2025-09-05', img:'assets/Images/aleppo1.jpg', gallery:['assets/Images/aleppo1.jpg','assets/Images/aleppo2.jpg','assets/Images/aleppo3.jpg','assets/Images/aleppo4.jpg'], map:'assets/Images/aleppomap.jpg'},
    { id: 6, titleAr:'مهرجان الفن التشكيلي السنوي الخامس', titleEn:'The Fifth Annual Fine Arts Festival', cat:'art', descAr:'يضم المهرجان 51 لوحة فنية متنوعة، قدمها 26 فنانًا بتقنيات وأحجام مختلفة.', descEn:'The exhibition includes 51 diverse paintings, presented by 26 artists in different techniques and sizes.', placeAr:'دمشق', placeEn:'Damascus', date:'2022-10-11', img:'assets/Images/fn1.jpg', gallery:['assets/Images/fn1.jpg','assets/Images/fn2.jpg','assets/Images/fn3.jpg','assets/Images/fn4.jpg'], map:'assets/Images/fnmap.jpg'},
    { id: 1, titleAr:'دار الأوبرا', titleEn:'Opera House', cat:'music', descAr:'عرض مسرحيات وأعمال درامية وفرق الأوركسترا.', descEn:'Presenting plays, dramas and orchestras.', placeAr:'دمشق', placeEn:'Damascus', date:'2025-06-01', img:'assets/Images/opera1.jpg', gallery:['assets/Images/opera1.jpg','assets/Images/opera2.jpg','assets/Images/opera3.jpg','assets/Images/opera4.jpg'], map:'assets/Images/operamap.jpg'},
    { id: 2, titleAr:'فرقة درجها', titleEn:'Darijha Band', cat:'sport', descAr:'فريق يضم جميع راكبي الدراجات تأكيدًا على أهمية الرياضة في الحياة.', descEn:'A team that includes all cyclists, emphasizing the importance of sport in life.', placeAr:'السويداء', placeEn:'Sweida', date:'2025-03-18', img:'assets/Images/darj1.jpg', gallery:['assets/Images/darj1.jpg','assets/Images/darj2.jpg','assets/Images/darj3.jpg','assets/Images/darj4.jpg'], map:'assets/Images/darjmap.jpg'},
    { id: 5, titleAr:'مسابقة القارئ الصغير', titleEn:'Young Reader Competition', cat:'culture', descAr:'مسابقة سنوية للأطفال تأكيدًا على أهمية القراءة في خلق جيل واعٍ.', descEn:'An annual competition for children to emphasize the importance of reading in creating an aware generation.', placeAr:'السويداء', placeEn:'Sweida', date:'2023-02-10', img:'assets/Images/Qar1.jpg', gallery:['assets/Images/Qar1.jpg','assets/Images/Qar2.jpg','assets/Images/Qar3.jpg','assets/Images/Qar4.jpg'], map:'assets/Images/Qarmap.jpg'},
    { id: 4, titleAr:'معرض الزهور الدولي في دمشق', titleEn:'International Flower Fair in Damascus', cat:'art', descAr:'شمل المعرض مجموعة من الفعاليات الثقافية والفنية والترفيهية، بالإضافة إلى عروض مسرحية للأطفال.', descEn:'The Fair included cultural, artistic, and entertainment events, plus children’s theater shows.', placeAr:'دمشق', placeEn:'Damascus', date:'2023-06-22', img:'assets/Images/zhor1.jpg', gallery:['assets/Images/zhor1.jpg','assets/Images/zhor2.jpg','assets/Images/zhor3.jpg','assets/Images/zhor4.jpg'], map:'assets/Images/zhormap.jpg'}
  ];

  const params = new URLSearchParams(window.location.search);
  const eventId = parseInt(params.get('id'));
  const selectedEvent = events.find(e => e.id === eventId);
  if (!selectedEvent) {
    container.innerHTML = `<p class="text-center mt-5">لم يتم العثور على الفعالية المطلوبة.</p>`;
    return;
  }
  const relatedEvent = events.find(e => e.cat === selectedEvent.cat && e.id !== selectedEvent.id);

  function renderDetails(lang){
    const gallerySlides = selectedEvent.gallery.map((img,i)=>`
      <div class="carousel-item ${i===0?'active':''}">
        <img src="${img}" class="d-block w-100 rounded" alt="">
      </div>`).join('');

    container.innerHTML = `
      <div class="row mb-5 align-items-start">
        <div class="col-md-6">
          <h2 class="fw-bold mb-3">${lang==='ar'?selectedEvent.titleAr:selectedEvent.titleEn}</h2>
          <p class="text-muted mb-1">📍 ${lang==='ar'?selectedEvent.placeAr:selectedEvent.placeEn}</p>
          <p class="text-muted mb-2">🗓️ ${selectedEvent.date}</p>
          <p class="fs-5 mb-3">${lang==='ar'?selectedEvent.descAr:selectedEvent.descEn}</p>
          <div class="mt-4">
            <button id="shareBtn" class="btn btn-primary mx-2">${lang==='ar'?'شارك':'Share'}</button>
            <button id="calendarBtn" class="btn btn-outline-primary mx-2">${lang==='ar'?'أضف إلى التقويم':'Add to Calendar'}</button>
          </div>
        </div>
        <div class="col-md-6 text-center">
          <img src="${selectedEvent.map}" alt="map" class="img-fluid rounded shadow" style="max-width: 250px; height: auto;">
        </div>
      </div>

      <div id="eventGallery" class="carousel slide mb-5" data-bs-ride="carousel">
        <div class="carousel-inner">${gallerySlides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#eventGallery" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#eventGallery" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>

      ${relatedEvent ? `
      <section class="related-event">
        <h4 class="text-center mb-4">${lang==='ar'?'فعالية ذات صلة':'Related Event'}</h4>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="event-card p-3 shadow-sm text-center">
              <img src="${relatedEvent.img}" class="img-fluid rounded mb-3" alt="">
              <h5>${lang==='ar'?relatedEvent.titleAr:relatedEvent.titleEn}</h5>
              <p class="text-muted">${lang==='ar'?relatedEvent.placeAr:relatedEvent.placeEn}</p>
              <a href="event.html?id=${relatedEvent.id}" class="btn btn-outline-primary">
                ${lang==='ar'?'عرض التفاصيل':'View Details'}
              </a>
            </div>
          </div>
        </div>
      </section>`:''}
    `;

    // تفعيل الأزرار
    document.getElementById('shareBtn').onclick = ()=>alert(lang==='ar'?'تم نسخ رابط الفعالية للمشاركة.':'Event link copied for sharing.');
    document.getElementById('calendarBtn').onclick = ()=>alert(lang==='ar'?'تمت إضافة الفعالية إلى التقويم (تجريبي).':'Event added to calendar (demo).');
  }

  // جلب اللغة من LocalStorage لتطبيقها
  const currentLang = localStorage.getItem('siteLang') || 'ar';
  renderDetails(currentLang);
})();


