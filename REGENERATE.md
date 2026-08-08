# KartvizitApp — Sıfırdan Yeniden Üretim Blueprint'i (Blueprint / PRD)

> Bu belge, mevcut **KartvizitApp** projesinin birebir kopyasının, tamamen boş bir proje üzerinde "vibe coding" yöntemiyle yeniden üretilmesi için tek referans kaynağıdır.
> Amaç: Bu belgeyi okuyan bir yapay zekanın (veya geliştiricinin) **hiçbir tahminde bulunmasına gerek kalmadan**, aynı davranışı, aynı yapıyı ve aynı görünümü üretebilmesidir.
>
> **Kaynak proje git adresi:** `git@github.com:necdetuygur/kartvizit-app.git`
> **Canlı yayın adresi:** `https://necdetuygur.github.io/kartvizit-app/`

---

## İçindekiler

1. [Projenin Amacı ve Özeti](#1-projenin-amacı-ve-özeti)
2. [Teknolojik Yığın (Tech Stack) ve Bağımlılıklar](#2-teknolojik-yığın-tech-stack-ve-bağımlılıklar)
3. [Dosya ve Klasör Yapısı](#3-dosya-ve-klasör-yapısı)
4. [Veri Modelleri ve Veritabanı Şeması](#4-veri-modelleri-ve-veritabanı-şeması)
5. [Kritik Fonksiyonlar ve İş Mantığı (Business Logic)](#5-kritik-fonksiyonlar-ve-iş-mantığı-business-logic)
6. [UI/UX ve Ekran Akışları](#6-uiux-ve-ekran-akışları)
7. [Ortam Değişkenleri (.env)](#7-ortam-değişkenleri-env)
8. [Test Altyapısı](#8-test-altyapısı)
9. [Deploy (GitHub Pages)](#9-deploy-github-pages)
10. [Önemli Proje Geçmişi ve Sürüm Notları](#10-önemli-proje-geçmişi-ve-sürüm-notları)
11. [Sıfırdan Üretim Adım Adım Checklist (Reproduction Guide)](#11-sıfırdan-üretim-adım-adım-checklist-reproduction-guide)

---

## 1. Projenin Amacı ve Özeti

**KartvizitApp**, iş kartvizitlerini (name card / "kartvizit") dijital ortamda saklamak, listelemek, aramak, eklemek, düzenlemek ve silmek için geliştirilmiş **tek sayfalık (SPA) bir web uygulamasıdır**.

### Temel Özellikler
- **Kartvizit Ekleme:** Yeni kartvizit formu (modal dialog) ile ekleme.
- **Kartvizit Listeleme:** Kayıtlı tüm kartvizitlerin responsive kart grid'i olarak görüntülenmesi.
- **Kartvizit Arama:** İsim, unvan, telefon, e-posta veya adres üzerinden canlı (keyup) metin araması.
- **Kartvizit Düzenleme:** Mevcut kartvizitin formu doldurulmuş şekilde açılıp güncellenmesi.
- **Kartvizit Silme:** Tek tıkla kartvizit silme (onay istemez).
- **Kalıcılık (Persistence):** Veriler tarayıcının `localStorage`'ında saklanır; sayfa yenilense bile veriler korunur.
- **Dil:** Arayüz tamamen **Türkçe**'dir.
- **Backend YOKTUR:** Hiçbir HTTP isteği, API çağrısı, kullanıcı girişi veya sunucu tarafı yoktur. Uygulama tamamen istemci taraflıdır ve GitHub Pages üzerinden statik olarak yayınlanır.

### Tasarım Kararları / Kısıtlar
- Modül bazlı Angular mimarisi kullanılır (**standalone bileşenler KULLANILMAZ**; tüm bileşenler `standalone: false` ve NgModule'lerde tanımlıdır).
- `CardsModule` lazy loading ile yüklenir (app-shell açılışta sadece header'ı yükler, kart modülünü route üzerinden getirir).
- UI, **Angular Material** (indigo-pink tema) + **Bootstrap 5** grid/utility sınıflarının birlikte kullanımıyla inşa edilmiştir.
- Görsel kimlik: Material `primary` renkli `mat-toolbar` başlık; `#f0f0f0` gri sayfa arka planı; Roboto fontu.

---

## 2. Teknolojik Yığın (Tech Stack) ve Bağımlılıklar

### 2.1. Runtime Ortamı
| Bileşen | Sürüm |
|---|---|
| Node.js | `v24.18.0` (test edilen ortam) |
| npm | `11.16.0` |

### 2.2. Production Dependencies (package.json → `dependencies`)
Tüm Angular paketleri **aynı major sürümde** (`20.x`) olmalıdır.

| Paket | package.json aralığı | node_modules'te kurulu (lockfile) |
|---|---|---|
| `@angular/animations` | `^20.3.27` | `20.3.27` |
| `@angular/cdk` | `^20.2.14` | `20.2.14` |
| `@angular/common` | `^20.3.27` | `20.3.27` |
| `@angular/compiler` | `^20.3.27` | `20.3.27` |
| `@angular/core` | `^20.3.27` | `20.3.27` |
| `@angular/forms` | `^20.3.27` | `20.3.27` |
| `@angular/material` | `^20.2.14` | `20.2.14` |
| `@angular/platform-browser` | `^20.3.27` | `20.3.27` |
| `@angular/platform-browser-dynamic` | `^20.3.27` | `20.3.27` |
| `@angular/router` | `^20.3.27` | `20.3.27` |
| `bootstrap` | `^5.2.3` | `5.3.8` |
| `rxjs` | `~7.8.0` | `7.8.x` |
| `tslib` | `^2.3.0` | `2.x` |
| `zone.js` | `~0.15.1` | `0.15.x` |

### 2.3. Dev Dependencies (package.json → `devDependencies`)
| Paket | package.json aralığı | node_modules'te kurulu (lockfile) |
|---|---|---|
| `@angular-devkit/build-angular` | `^20.3.33` | `20.3.33` |
| `@angular/cli` | `~20.3.33` | `20.3.33` |
| `@angular/compiler-cli` | `^20.3.27` | `20.3.27` |
| `@types/jasmine` | `~4.3.0` | `4.3.x` |
| `jasmine-core` | `~4.5.0` | `4.5.x` |
| `karma` | `~6.4.0` | `6.4.x` |
| `karma-chrome-launcher` | `~3.1.0` | `3.1.x` |
| `karma-coverage` | `~2.2.0` | `2.2.x` |
| `karma-jasmine` | `~5.1.0` | `5.1.x` |
| `karma-jasmine-html-reporter` | `~2.0.0` | `2.0.x` |
| `typescript` | `~5.8.3` | `5.8.3` |

### 2.4. package.json Scripts
```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```
- `start` → geliştirme sunucusu (`http://localhost:4200`)
- `build` → production build (varsayılan yapılandırma `production`)
- `test` → Karma + Jasmine unit testler

> Not: Deploy için `angular-cli-ghpages` paketi **kurulu değildir**; README'de geçen `ng deploy` komutu için bu paketin `ng add angular-cli-ghpages` ile eklenmesi gerekir (bkz. Bölüm 9).

### 2.5. TypeScript / tsconfig.json
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```
Kritik notlar:
- `strict: true` + `strictTemplates: true` → şablon tipleri sıkı denetlenir.
- `moduleResolution: "bundler"` (v15'ten bu yana `"node"` idi, güncel olarak bundler kullanılıyor).
- `baseUrl: "./"` → kodda `src/app/models/card` gibi **kök tabanlı import** yapılabilir (proje zaten bunu kullanıyor: `import { Card } from 'src/app/models/card';`).

### 2.6. tsconfig.app.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "outDir": "./out-tsc/app", "types": [] },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

### 2.7. tsconfig.spec.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "outDir": "./out-tsc/spec", "types": ["jasmine"] },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### 2.8. angular.json (anahtar yapılandırma)
- `projectType`: `application`
- `sourceRoot`: `src`
- `prefix`: `app`
- Component şeması `style`: `scss`
- `build` options:
  - `outputPath`: `dist/kartvizit-app`
  - `index`: `src/index.html`
  - `main`: `src/main.ts`
  - `polyfills`: `["zone.js"]`
  - `tsConfig`: `tsconfig.app.json`
  - `inlineStyleLanguage`: `scss`
  - `assets`: `["src/favicon.ico", "src/assets"]`
  - `styles` (sıra önemli):
    1. `./node_modules/bootstrap/dist/css/bootstrap.min.css`
    2. `@angular/material/prebuilt-themes/indigo-pink.css`
    3. `src/styles.scss`
  - `scripts`: `["./node_modules/bootstrap/dist/js/bootstrap.min.js"]`
- `production` build: `budgets` (initial: warning 500kb / error 1mb; anyComponentStyle: warning 2kb / error 4kb), `outputHashing: "all"`
- `test` (karma) options: `polyfills: ["zone.js", "zone.js/testing"]`, styles'ta sadece indigo-pink + `src/styles.scss` (Bootstrap HTML'i testte gerekmez), `scripts: []`
- `cli.analytics`: `false`
- `schematics` blokları: Angular CLI şematik tipleri (component/directive/service/guard/interceptor/module/pipe/resolver) tanımlı.

### 2.9. HTML Başlık Sayfası Kaynakları (src/index.html)
- `lang` özelliği **bilinçli olarak boş bırakılmıştır** (`<html>` — git geçmişinde `lang="en"`'den kaldırılmıştır).
- Google Fonts: Roboto (300/400/500) ve Material Icons.
- `<body class="mat-typography">`.

---

## 3. Dosya ve Klasör Yapısı

```
kartvizit-app/
├── .editorconfig                  # UTF-8, 2 boşluk indent, [*.ts] single quote
├── .gitignore                     # dist/, node_modules/, package-lock.json dahil standart
├── .vscode/
│   ├── extensions.json            # "angular.ng-template" önerilir
│   ├── launch.json                # "ng serve" ve "ng test" debug konfigürasyonları
│   └── tasks.json                 # npm: start ve npm: test background task'ları
├── angular.json                   # CLI yapılandırması (Bölüm 2.8)
├── package.json                   # Bağımlılıklar ve scriptler
├── package-lock.json              # (gitignore'da; sürüm pinleme için lock dosyası)
├── README.md                      # Standart Angular README + gh-pages deploy talimatı
├── tsconfig.json                  # Bölüm 2.5
├── tsconfig.app.json              # Bölüm 2.6
├── tsconfig.spec.json             # Bölüm 2.7
└── src/
    ├── assets/                    # .gitkeep (tek dosya)
    ├── favicon.ico                # Angular varsayılan favicon
    ├── index.html                 # Shell HTML (Bölüm 2.9 / 6)
    ├── main.ts                    # platformBrowserDynamic().bootstrapModule(AppModule)
    ├── styles.scss                # Global stiller
    └── app/
        ├── app-routing.module.ts          # Kök router (lazy load)
        ├── app.component.html             # <app-header> + <main><router-outlet>
        ├── app.component.scss             # Boş
        ├── app.component.spec.ts          # AppComponent unit testi
        ├── app.component.ts               # AppComponent (title = 'kartvizit-app')
        ├── app.module.ts                  # Kök NgModule
        ├── cards/                         # LAZY MODULE (CardsModule)
        │   ├── card-item/
        │   │   ├── card-item.component.html
        │   │   ├── card-item.component.scss   # Boş
        │   │   ├── card-item.component.spec.ts
        │   │   └── card-item.component.ts      # Tek kartvizit kartı
        │   ├── card-modal/
        │   │   ├── card-modal.component.html
        │   │   ├── card-modal.component.scss   # .form, .full-width
        │   │   ├── card-modal.component.spec.ts
        │   │   └── card-modal.component.ts      # Ekle/Düzenle form dialogu
        │   ├── card-search/
        │   │   ├── card-search.component.html
        │   │   ├── card-search.component.scss   # Boş
        │   │   ├── card-search.component.spec.ts
        │   │   └── card-search.component.ts      # Arama kutusu
        │   ├── cards-routing.module.ts           # '' → CardsComponent
        │   ├── cards.component.html              # Liste + arama + ekleme butonu
        │   ├── cards.component.scss              # .page-title (kullanılmıyor)
        │   ├── cards.component.spec.ts
        │   ├── cards.component.ts                # Ana kartvizit listesi
        │   └── cards.module.ts                   # CardsModule tanımı
        ├── components/
        │   └── header/
        │       ├── header.component.html         # mat-toolbar "Kartvizit App"
        │       ├── header.component.scss         # .example-spacer, .header-menu (kullanılmıyor)
        │       ├── header.component.spec.ts
        │       └── header.component.ts           # Boş bileşen
        ├── models/
        │   └── card.ts                           # Card interface
        └── services/
            └── card.service.ts                   # CRUD + filtre + localStorage
```

---

## 4. Veri Modelleri ve Veritabanı Şeması

### 4.1. Veritabanı
- **Gerçek bir veritabanı yoktur.** Tüm kalıcı veri, tarayıcı `localStorage`'ında tek bir anahtar altında tutulur:
  - **Anahtar:** `cards`
  - **Değer:** `Card[]` dizisinin `JSON.stringify` edilmiş hali (ör. `[{"id":1677...,"name":"...","title":"...","phone":"...","email":"...","address":"..."}]`).
- Uygulama ilk açılışta `JSON.parse(localStorage.getItem('cards') || '[]')` ile veriyi okur; anahtar yoksa boş dizi kullanılır.

### 4.2. Card Modeli (`src/app/models/card.ts`)
```typescript
export interface Card {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
}
```

### 4.3. Alan Tanımları ve Kısıtlar
| Alan | Tip | Zorunlu? | Maks. Uzunluk | Ek Kural |
|---|---|---|---|---|
| `id` | `number` | Evet (otomatik) | — | `Date.now()` zaman damgası; asla formdan alınmaz |
| `name` | `string` | Hayır | 50 | Boş bırakılabilir |
| `title` | `string` | **Evet** | 255 | — |
| `phone` | `string` | **Evet** | 20 | — |
| `email` | `string` | Hayır | 50 | `Validators.email` (geçerli e-posta formatı) |
| `address` | `string` | Hayır | 255 | Formda `<textarea>` olarak sunulur |

> Zorunluluk ve uzunluk kısıtları hem form validasyonunda (card-modal) hem de modelde geçerlidir. Form geçersizken "Kaydet" butonu pasiftir.

---

## 5. Kritik Fonksiyonlar ve İş Mantığı (Business Logic)

### 5.1. CardService (`src/app/services/card.service.ts`)
`providedIn: 'root'` ile singleton servis. Tüm kartvizit verisi ve arama durumu burada yaşar.

**Durum (State):**
```typescript
private cards: Card[] = JSON.parse(localStorage.getItem('cards') || '[]'); // ana veri
private filterQuery: string = '';                                          // aktif arama metni (küçük harf)
public filteredCards: Card[] = this.cards;                                 // görüntülenecek liste
```

#### `Get(): Card[]`
- `this.cards` dizisini döndürür. Sayfa (cards.component) listeleme ve boş kontrol için bunu kullanır.

#### `Add(card: Card)`
1. `card.id = new Date().getTime();` — yeni kayda **zaman damgası** olarak benzersiz sayısal id atanır.
2. `this.cards.push(card)` — diziye eklenir.
3. `this.Reload()` çağrılır.

#### `Remove(id: number)`
1. `this.cards = this.cards.filter((item) => item.id !== id);` — id eşleşen kayıt çıkarılır.
2. `this.Reload()` çağrılır.

#### `Update(id: number, card: Card)`
1. `this.Remove(id)` — eski kayıt önce silinir (bu da bir Reload tetikler).
2. `card.id = id;` — gelen form değerine **orijinal id geri yazılır** (aksi halde `Add` gibi yeni id alırdı).
3. `this.cards.push(card);`
4. `this.Reload()` çağrılır.

> **Yan etki notu:** `Remove` içinde de Reload çağrıldığı için `Update` sırasında arama durumu ara adımda sıfırlanıp hemen tekrar uygulanır; nihai sonuç doğrudur.

#### `Filter(query: string)`
1. `this.filterQuery = query.toLowerCase();` — sorgu küçük harfe çevrilip saklanır.
2. `this.filteredCards` = tüm kartlardan şu koşulu sağlayanlar:
   ```
   card.name.toLowerCase().indexOf(filterQuery) > -1   ||
   card.title.toLowerCase().indexOf(filterQuery) > -1  ||
   card.phone.toLowerCase().indexOf(filterQuery) > -1  ||
   card.email.toLowerCase().indexOf(filterQuery) > -1  ||
   card.address.toLowerCase().indexOf(filterQuery) > -1
   ```
   Yani **5 alanın herhangi birinde** büyük/küçük harf duyarsız substring eşleşmesi. Boş sorgu ile tüm kartlar eşleşir.

#### `private Reload()`
1. `localStorage.setItem('cards', JSON.stringify(this.cards));` — kalıcılık (persist).
2. `this.filteredCards = this.cards;` — filtre listesi önce tüm veriye ayarlanır.
3. `this.Filter(this.filterQuery);` — mevcut (muhtemelen boş veya kullanıcının yazdığı) sorgu yeniden uygulanır.

> **Tarihsel not ("Reload bug fix" commit'i):** Eski sürümde her CRUD sonrası `filteredCards` sıfırlanıyor ve kullanıcının aktif araması kayboluyordu. `filterQuery`'nin saklanıp Reload içinde yeniden uygulanması bu bug'ı çözmüştür. **Bu davranış korunmalıdır.**

### 5.2. Bileşenlerin Sorumlulukları ve Akışlar

#### CardsComponent (`cards.component.ts`)
- `MatDialog` enjekte eder; `CardService` `public` olarak enjekte edilir (şablonda doğrudan erişim için).
- `openDialog()` → `this.dialog.open(CardModalComponent)` ile **veri göndermeden** yeni kayıt modali açar.

#### CardItemComponent (`card-item/card-item.component.ts`)
- `@Input() card!: Card;` — listeden gelen kart.
- `openDialog(c: Card)` → `this.dialog.open(CardModalComponent, { data: c })` ile **düzenleme modali** açar (kart nesnesi `MAT_DIALOG_DATA` olarak geçer).
- `remove(id: number)` → `this.cardService.Remove(id)` (doğrudan siler; **onay sorusu yoktur**).

#### CardModalComponent (`card-modal/card-modal.component.ts`)
- `@Inject(MAT_DIALOG_DATA) public data: Card` — düzenleme için gelen kart. Yeni kayıtta `data` `undefined`'dır.
- `ngOnInit()` → `FormBuilder` ile `cardForm` grubu kurulur. Her alan `this.data?.<alan> || ''` ile başlar (düzenlemede mevcut değer, yeni kayıtta boş string).
  - `name`: `Validators.maxLength(50)`
  - `title`: `[Validators.required, Validators.maxLength(255)]`
  - `phone`: `[Validators.required, Validators.maxLength(20)]`
  - `email`: `[Validators.email, Validators.maxLength(50)]`
  - `address`: `Validators.maxLength(255)`
- `addCard()`: `showSpinner = true` → `cardService.Add(this.cardForm.value)` → `dialogRef.close()` → `showSpinner = false`.
- `updateCard()`: `showSpinner = true` → `cardService.Update(this.data.id, this.cardForm.value)` → `dialogRef.close()` → `showSpinner = false`.
- **Kaydet butonu:** `[disabled]="cardForm.invalid || showSpinner"` → form geçersizken veya işlem sürerken pasif. Tıklanınca `data ? updateCard() : addCard()`.
- **İptal butonu:** `mat-dialog-close` ile kayıt yapmadan kapanır.
- `showSpinner` true iken `mat-progress-bar` (indeterminate) gösterilir. Bu, gerçek bir async işlem olmasa da "kayıt sürüyor" hissi verir; Add/Update **senkron** çalıştığı için pratikte anlıktır.

#### CardSearchComponent (`card-search/card-search.component.ts`)
- `search(query: string)` → `this.cardService.Filter(query)`. Şablonda input `#searchText` referanslı olup `(keyup)` ile her tuş vuruşunda çağrılır (canlı arama, debounce yok).

#### HeaderComponent (`header/header.component.ts`)
- Hiçbir mantık içermez; sadece görsel başlık çubuğu render eder.

#### AppComponent
- `title = 'kartvizit-app'`; yalnızca `<app-header>` ve `<router-outlet>` barındırır.

### 5.3. Router Mantığı
- **Kök route (`app-routing.module.ts`):** `path: ''` → `loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule)` — **lazy loading**.
- **CardsModule route (`cards-routing.module.ts`):** `path: ''` → `CardsComponent`.
- Başka hiçbir route yoktur. Uygulamanın tek görünür sayfası kartvizit listesidir.

---

## 6. UI/UX ve Ekran Akışları

### 6.1. Global Görünüm (src/styles.scss)
```scss
html, body { height: 100%; }
body {
  margin: 0;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  background-color: #f0f0f0;   // gri sayfa arka planı
}
main { padding: 15px; }
```

### 6.2. App Shell (app.component.html)
```html
<app-header></app-header>
<main>
  <router-outlet></router-outlet>
</main>
```

### 6.3. Header (header.component.html)
- `mat-toolbar color="primary"` içinde `<span>Kartvizit App</span>` başlığı. Üstte Material ana renkli bir çubuk.
- `.header.scss` içindeki `.example-spacer` ve `.header-menu` sınıfları **şablonda kullanılmıyor** (ölü kod), ancak dosyada mevcuttur.

### 6.4. Kartvizit Listesi Sayfası (cards.component.html)
Bootstrap grid yapısı:

```
Satır 1 (row mb-4):
  ├─ col-md-8  → <app-card-search> (arama kutusu)
  └─ col-md-4 text-end → [Kartvizit Ekle] butonu (mat-raised-button color="primary")

Satır 2 (row):
  ├─ col-12 → Yükleme durumu: "Kartvizitler yükleniyor. Lütfen bekleyiniz."
  │           (*ngIf="!cardService.Get()" — pratikte hiç tetiklenmez; korunan kalıptır)
  ├─ col-12 → Boş durum: "Henüz kartvizit eklemediniz. Buraya tıklayarak ilk
  │           kartvizitinizi ekleyebilirsiniz." (a href ile openDialog açılır)
  │           (*ngIf="cardService.Get()?.length === 0")
  └─ col-md-3 mb-4 → *ngFor="let item of cardService.filteredCards" → <app-card-item [card]="item">
```

**Responsive davranış:** Her kart `col-md-3` olduğundan, 992px ve üzerinde tek satırda 4 kart; altında (md altı) kartlar tek sütuna düşer. Search alanı `col-md-8`, ekleme butonu `col-md-4` ile sağa hizalanır (`text-end`).

### 6.5. Kart Öğesi (card-item.component.html)
Material `mat-card` yapısı:
- `mat-card-header`: `mat-card-title` = `card.name`, `mat-card-subtitle` = `card.title`
- `mat-card-content`: Bootstrap `list-group list-group-flush` ile 3 satır:
  - `Telefon: {{ card.phone }}`
  - `E-Posta: {{ card.email }}`
  - `Adres: {{ card.address }}`
- `mat-card-footer` (`d-flex p-3 justify-content-between`):
  - Sol: **[Sil]** `mat-raised-button color="warn"` → `remove(card.id)`
  - Sağ: **[Düzenle]** `mat-raised-button color="primary"` → `openDialog(card)`

### 6.6. Ekle/Düzenle Modali (card-modal.component.html)
- `h2 mat-dialog-title`: `{{ data ? "Kartviziti Düzenle" : "Yeni Kartvizit Ekle" }}`
- `mat-dialog-content`:
  - `*ngIf="showSpinner"` → `mat-progress-bar mode="indeterminate"` + `<br/>`
  - `form.form[formGroup]` içinde **5 adet** `mat-form-field.full-width`:
    1. `İsim Soyisim` → `input matInput formControlName="name"`
    2. `Unvan` → `input matInput formControlName="title"`
    3. `Telefon` → `input matInput formControlName="phone"`
    4. `E-Posta` → `input matInput formControlName="email"`
    5. `Adres` → `textarea matInput formControlName="address"`
- `mat-dialog-actions align="end"`:
  - **[İptal]** `mat-raised-button mat-dialog-close`
  - **[Kaydet]** `mat-raised-button color="primary" [mat-dialog-close]="true" (click)="data ? updateCard() : addCard()" [disabled]="cardForm.invalid || showSpinner"`

### 6.7. Modal Stilleri (card-modal.component.scss)
```scss
.form { min-width: 150px; max-width: 500px; width: 100%; }
.full-width { width: 100%; }
```

### 6.8. Ekran Akış Diyagramı (metin)
```
[Uygulama açılır]
   └─ AppComponent: Header + router-outlet
        └─ Route '' → CardsModule → CardsComponent (listeleme)

[Kartvizit Ekle] butonu veya boş durumdaki link
   └─ CardsComponent.openDialog() → CardModalComponent (data yok)
        ├─ İptal → modal kapanır
        └─ Kaydet (form geçerliyse) → cardService.Add() → localStorage yazılır → liste yenilenir → modal kapanır

[Sil] butonu
   └─ CardItemComponent.remove(id) → cardService.Remove() → localStorage güncellenir → liste (ve filtre) yenilenir

[Düzenle] butonu
   └─ CardItemComponent.openDialog(card) → CardModalComponent (data = kart)
        ├─ İptal → değişiklik kaybolur
        └─ Kaydet → cardService.Update(id, form) → localStorage güncellenir → liste yenilenir → modal kapanır

[Arama kutusuna yazı]
   └─ CardSearchComponent.search(q) → cardService.Filter(q) → filteredCards güncellenir → liste anlık filtrelenir
```

### 6.9. Kullanıcıya Gösterilen Tüm Türkçe Metinler (tam liste)
| Bağlam | Metin |
|---|---|
| Toolbar | `Kartvizit App` |
| Ekleme butonu | `Kartvizit Ekle` |
| Yükleme mesajı | `Kartvizitler yükleniyor. Lütfen bekleyiniz.` |
| Boş durum | `Henüz kartvizit eklemediniz. Buraya tıklayarak ilk kartvizitinizi ekleyebilirsiniz.` |
| Arama label | `Kartvizit Ara` |
| Arama placeholder | `İsim Soyisim, Unvan, Telefon, E-Posta, Adres` |
| Kart listesi | `Telefon: ...`, `E-Posta: ...`, `Adres: ...` |
| Sil butonu | `Sil` |
| Düzenle butonu | `Düzenle` |
| Dialog başlıkları | `Yeni Kartvizit Ekle` / `Kartviziti Düzenle` |
| Form alanları | `İsim Soyisim`, `Unvan`, `Telefon`, `E-Posta`, `Adres` |
| Dialog butonları | `İptal`, `Kaydet` |
| Sayfa başlığı | `<title>KartvizitApp</title>` |

---

## 7. Ortam Değişkenleri (.env)

**Bu projede `.env` dosyası YOKTUR ve hiçbir ortam değişkeni / gizli anahtar (API key, secret, token) KULLANILMAZ.**

Nedenleri:
- Proje tamamen istemci taraflıdır (static SPA); arka plan servisi, API çağrısı veya kimlik doğrulama bulunmaz.
- Angular `environments/environment.ts` dosyaları da oluşturulmamıştır (`src/environments/` klasörü yoktur).
- Veriler yalnızca kullanıcının kendi tarayıcısının `localStorage`'ında saklanır.

Yeniden üretim sırasında **`.env` dosyası oluşturulmamalı**; üretimde kullanılan tek "yapılandırma" değeri GitHub Pages için `--base-href` parametresidir (Bölüm 9).

---

## 8. Test Altyapısı

- Çerçeve: **Karma** + **Jasmine** (`ng test`).
- `tsconfig.spec.json` → `types: ["jasmine"]`.
- Mevcut spec dosyaları (her bileşen için "should create" + AppComponent için 3 test):
  - `app.component.spec.ts`: (1) uygulama oluşturulur, (2) `title === 'kartvizit-app'`, (3) `compiled.querySelector('.content span')?.textContent` içinde `'kartvizit-app app is running!'` bulunur. **Not:** Bu son test, şablon artık `.content span` içermediği için güncel şablonda başarısız olur (eski boilerplate kalıntısı); üretimle birebir aynı davranış isteniyorsa aynı bırakılabilir.
  - `cards.component.spec.ts`, `card-item.component.spec.ts`, `card-modal.component.spec.ts`, `card-search.component.spec.ts`, `header.component.spec.ts`: her biri yalnızca `should create` doğrulaması yapar (`TestBed.configureTestingModule` ile ilgili bileşen `declarations`'a eklenir).
- Test çalıştırma: `npm test` (Chrome launcher; `karma-chrome-launcher`). Headless ortamda `ChromeHeadless` kullanılabilir.

---

## 9. Deploy (GitHub Pages)

Uygulama GitHub Pages üzerinde `https://necdetuygur.github.io/kartvizit-app/` adresinde yayınlanmıştır. README'deki talimat:

```
git checkout -b gh-pages
ng add angular-cli-ghpages
ng deploy --base-href=https://necdetuygur.github.io/kartvizit-app/
git stash
git checkout master
git branch -D gh-pages
```

Önemli notlar:
- Uygulama sub-path altında (`/kartvizit-app/`) yayınlandığı için **`base-href` zorunludur**; aksi halde asset/router yolları kırılır.
- `angular-cli-ghpages` devDependency olarak kurulur (`ng add angular-cli-ghpages` ile). Mevcut repo'da bu paket kurulu değildir; deploy anında eklenir.
- Routing `useHash` kullanmaz; default PathLocationStrategy geçerlidir. Ancak tek bir route olduğu için sayfa yenilemede sorun çıkmaz.

---

## 10. Önemli Proje Geçmişi ve Sürüm Notları

Proje Angular 15 ile başlatılmış (`README`de "generated with Angular CLI version 15.2.0"), ardından sürüm yükseltmeleri yapılmıştır:
- Angular **16 → 17 → 18 → 19 → 20** ardışık yükseltme commit'leri (`ng update`).
- Son durum: **Angular 20.3.27**, CLI 20.3.33.
- `moduleResolution` v15 döneminde `"node"` iken güncel haliyle `"bundler"` yapılmıştır.
- `angular.json` içine `cli.analytics = false` eklenmiştir (git geçmişi "analytics" commit'i).

**Dikkat edilmesi gereken davranışsal sabitler (behavior contract):**
1. Veri kaybı olmadan localStorage kalıcılığı.
2. CRUD sonrası aktif arama sorgusunun korunması (Reload bug fix).
3. Form geçersizken Kaydet'in pasif kalması.
4. Silme işleminde onay sorusu sorulmaması.
5. Düzenlemede id'nin korunması (`Update` → Remove + id geri yazımı).
6. Tüm bileşenlerin `standalone: false` olması (NgModule mimarisi).
7. Lazy loading: kök route'tan `CardsModule`'un `loadChildren` ile yüklenmesi.

---

## 11. Sıfırdan Üretim Adım Adım Checklist (Reproduction Guide)

Aşağıdaki sıra ile birebir üretim garanti edilir:

1. **Proje iskeleti:** `ng new kartvizit-app --style=scss --routing` (module tabanlı; standalone seçeneğini **kapat**). Strict mod varsayılan gelir.
2. **Bağımlılıklar:**
   - `ng add @angular/material` → indigo-pink tema, Material Icons + Roboto, `BrowserAnimationsModule`'ü otomatik eklet.
   - `npm install bootstrap@^5.2.3` (kurulu sürüm 5.3.8).
3. **angular.json düzenle:** `build.options.styles` sırası = Bootstrap CSS → indigo-pink → `src/styles.scss`; `scripts` = Bootstrap JS. `cli.analytics` = `false`. `tsconfig.json` `moduleResolution` = `"bundler"` (Angular 20 varsayılanı zaten bu olabilir).
4. **AppModule + Header:** `src/app/components/header/` altında `HeaderComponent` üret (`.html`, `.scss`, `.spec.ts`, `.ts`), `app.module.ts`'te `AppComponent` ile birlikte `declarations`'a ekle; `MatToolbarModule` import et. `app.component.html`'i `<app-header></app-header><main><router-outlet></router-outlet></main>` yap.
5. **Router:** `app-routing.module.ts`'te `path: ''` → `loadChildren` ile `CardsModule`.
6. **Model:** `src/app/models/card.ts` → `Card` interface (Bölüm 4.2).
7. **Servis:** `src/app/services/card.service.ts` → Bölüm 5.1'deki birebir mantık (özellikle `Reload` + `filterQuery` korunumu).
8. **CardsModule:** `src/app/cards/` klasöründe 4 bileşeni üret: `CardsComponent`, `CardItemComponent`, `CardModalComponent`, `CardSearchComponent`. `cards.module.ts`'te `CommonModule`, `CardsRoutingModule`, `MatCardModule`, `MatDialogModule`, `MatButtonModule`, `MatInputModule`, `FormsModule`, `ReactiveFormsModule`, `MatProgressBarModule` import et; 4 bileşeni `declarations`'a ekle. `cards-routing.module.ts` → `''` → `CardsComponent`.
9. **Bileşen şablonları:** Bölüm 6'daki HTML'leri birebir kopyala (Türkçe metinler dahil). Modal validasyonlarını Bölüm 5.2'deki gibi kur.
10. **Global stiller:** `src/styles.scss` → Bölüm 6.1.
11. **index.html:** `<html>` (lang'siz), Roboto + Material Icons linkleri, `body.mat-typography`, `<title>KartvizitApp</title>`.
12. **Testler:** Her bileşene "should create" spec'i; `app.component.spec.ts` için Bölüm 8'deki 3 test.
13. **Doğrulama:** `npm install` → `npm start` (localhost:4200) → aşağıdaki senaryoyu test et:
    - Aç: boş durum mesajı görünmeli.
    - "Kartvizit Ekle" → modal → "Unvan" ve "Telefon" boşken Kaydet pasif; doldurup kaydet → kart listede.
    - Arama kutusuna bir şey yaz → anlık filtreleme; kart ekle/sil → arama korunmalı.
    - Sayfayı yenile → veriler localStorage'dan geri gelmeli.
    - "Düzenle" → modal mevcut değerlerle açılmalı; "Sil" → onaysız silinmeli.
14. **Build ve deploy:** `npm run build` → `dist/kartvizit-app`; GitHub Pages için `ng add angular-cli-ghpages` + `ng deploy --base-href=https://necdetuygur.github.io/kartvizit-app/`.
