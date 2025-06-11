# Token Request - Offene Fragen zur Entscheidung

## 1. **Opacity/Transparenz-Syntax** 
Wie sollen wir Transparenz-Werte schreiben?

- [ ] **Option A**: `primary.500/10` (Tailwind-Style mit Slash)
- [ ] **Option B**: `primary.500.alpha10` (Mit alpha-Suffix)
- [ ] **Option C**: `primary.500-10` (Mit Bindestrich)

**Empfehlung**: Option A (Tailwind-kompatibel)

---

## 2. **Dark Mode Farben**
Brauchen wir explizite Dark-Mode-Tokens oder nutzen wir Intensitäten?

- [ ] **Option A**: Nutze bestehende Skala (`success.900` für Dark Mode)
- [ ] **Option B**: Eigene Dark-Tokens (`success.dark`, `success.darkBg`)
- [ ] **Option C**: Suffix-System (`success.500.dark`)

**Empfehlung**: Option A (einfacher, weniger Tokens)

---

## 3. **Icon-Größen-Benennung**
Wie benennen wir Icon-Größen?

- [ ] **Option A**: T-Shirt-Größen (`size.icon.sm`, `size.icon.md`)
- [ ] **Option B**: Pixel-basiert (`size.icon.16`, `size.icon.20`)
- [ ] **Option C**: Nummer-System (`size.icon.1`, `size.icon.2`)

**Empfehlung**: Option A (intuitiv, bekannt)

---

## 4. **Gradient-Support**
Wie definieren wir Gradients?

- [ ] **Option A**: Als String-Token (`gradient.primary: 'from-orange-400 to-orange-600'`)
- [ ] **Option B**: Als Objekt (`gradient.primary.from`, `gradient.primary.to`)
- [ ] **Option C**: Keine Gradient-Tokens (Tailwind-Klassen direkt)

**Empfehlung**: Option B (flexibler)

---

## 5. **Status-Farben-Intensitäten**
Welche Intensitäten brauchen Status-Farben?

- [ ] **Option A**: Volle Skala (50-950) wie primary/neutral
- [ ] **Option B**: Reduzierte Skala (100, 500, 700, 900)
- [ ] **Option C**: Minimal (light, base, dark)

**Empfehlung**: Option B (ausreichend, übersichtlich)

---

## 6. **Spacing für spezielle Werte**
Sollen wir alle Tailwind-Spacings abbilden?

- [ ] **Option A**: Alle Werte (0-96)
- [ ] **Option B**: Nur häufig genutzte (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- [ ] **Option C**: Custom-Werte on-demand hinzufügen

**Empfehlung**: Option B + C (Basis-Set + Erweiterbar)

---

## 7. **Component-spezifische Tokens**
Brauchen wir component-spezifische Tokens?

- [ ] **Option A**: Ja (`button.primary.bg`, `card.border.color`)
- [ ] **Option B**: Nein (nur globale Tokens)
- [ ] **Option C**: Hybrid (globale Tokens + component presets)

**Empfehlung**: Option C (Flexibilität + Konsistenz)

---

## 8. **Breaking Changes**
Wie gehen wir mit bestehenden Token-Namen um?

- [ ] **Option A**: Harter Cut (alle auf einmal umbenennen)
- [ ] **Option B**: Soft Migration (alte Namen deprecaten, neue parallel)
- [ ] **Option C**: Aliases (beide Namen unterstützen)

**Empfehlung**: Option B (sanfter Übergang)

---

## 9. **Token-Datei-Struktur**
Wie organisieren wir die Token-Dateien?

- [ ] **Option A**: Eine große Datei (`design-tokens.ts`)
- [ ] **Option B**: Nach Kategorie (`colors.ts`, `spacing.ts`, etc.)
- [ ] **Option C**: Nach Verwendung (`tokens/base.ts`, `tokens/components.ts`)

**Empfehlung**: Option B (übersichtlich, modular)

---

## 10. **Versionierung**
Wie versionieren wir Token-Änderungen?

- [ ] **Option A**: Semantic Versioning (1.0.0, 1.1.0, 2.0.0)
- [ ] **Option B**: Datum-basiert (2024.01, 2024.02)
- [ ] **Option C**: Keine explizite Versionierung

**Empfehlung**: Option A (Standard, klar)

---

## Entscheidung benötigt bis: [DATUM]

**Teilnehmer**:
- [ ] Design Lead
- [ ] Frontend Lead  
- [ ] Product Owner
- [ ] UX Designer

**Nächste Schritte nach Entscheidung**:
1. Token-Struktur implementieren
2. Migration durchführen
3. Dokumentation aktualisieren
4. Team schulen