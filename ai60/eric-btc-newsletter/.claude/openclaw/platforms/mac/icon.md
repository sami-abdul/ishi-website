# Menu Bar Icon

## Menu Bar Icon States

**Author:** steipete · **Updated:** 2025-12-06 · **Scope:** macOS app (`apps/macos`)

### States

**Idle:** The icon performs normal animation including blinking and occasional wiggling movements.

**Paused:** The status item applies `appearsDisabled` styling with no motion effects.

**Voice trigger (big ears):** When the voice wake detector identifies the activation phrase, it invokes `AppState.triggerVoiceEars(ttl: nil)`, maintaining `earBoostActive=true` during utterance capture. The ears enlarge to 1.9x scale, display circular holes for improved visibility, then deactivate via `stopVoiceEars()` after one second of silence. This trigger activates exclusively through the in-app voice pipeline.

**Working (agent running):** Setting `AppState.isWorking=true` produces a "tail/leg scurry" micro-animation featuring accelerated leg movement and subtle horizontal displacement while operations proceed. This behavior currently integrates with WebChat agent runs; similar toggles should extend to other extended tasks when implemented.

## Wiring Points

- **Voice wake:** Call `AppState.triggerVoiceEars(ttl: nil)` upon trigger and `stopVoiceEars()` after one second of silence to align with the capture window.
- **Agent activity:** Use `AppStateStore.shared.setWorking(true/false)` around work intervals (already integrated in WebChat agent calls). Keep intervals brief and reset within `defer` blocks to prevent animation persistence.

## Shapes & Sizes

The icon base renders via `CritterIconRenderer.makeIcon(blink:legWiggle:earWiggle:earScale:earHoles:)`. Ear scale defaults to `1.0`; voice activation sets `earScale=1.9` and enables `earHoles=true` without frame modification (18x18 pt template rendered into 36x36 px Retina backing).

Scurry animation uses leg wiggle up to approximately 1.0 with minor horizontal movement, functioning additively with existing idle wiggle.

## Behavioral Notes

- Avoid external CLI/broker toggles for ear or working states; maintain these as internal app signals to prevent unintended activation.
- Keep time-to-live values under 10 seconds so animations reset to baseline if tasks stall.