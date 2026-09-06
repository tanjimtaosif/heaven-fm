import {
  SPACE_TYPES,
  FINISH_PREFERENCES,
  BUDGET_RANGES,
  TIMELINES,
} from '@/constants/quotationData'
import {
  Chip,
  FieldShell,
  OptionCard,
  StepIntro,
  SwitchRow,
  TextField,
} from '../QuotationFields'

export const SpecsStep = ({ form, errors, updateForm, toggleInArray }) => (
  <div className="space-y-6">
    <StepIntro
      title="Tell us about the space"
      description="A rough idea of the room, the finish you lean toward, and your budget is enough for us to price it accurately."
    />

    <FieldShell label="Type of space" error={errors.spaceType} required>
      <div className="flex flex-wrap gap-2">
        {SPACE_TYPES.map((space) => (
          <Chip
            key={space.id}
            selected={form.spaceType === space.id}
            onClick={() => updateForm({ spaceType: space.id })}
          >
            {space.label}
          </Chip>
        ))}
      </div>
    </FieldShell>

    <TextField
      label="Room size"
      hint="Optional"
      placeholder="e.g. 12 ft × 14 ft, or 1,450 sq ft flat"
      value={form.roomDimensions}
      onChange={(e) => updateForm({ roomDimensions: e.target.value })}
    />

    <FieldShell
      label="Finish & material preference"
      hint="Select all that appeal"
    >
      <div className="flex flex-wrap gap-2">
        {FINISH_PREFERENCES.map((finish) => (
          <Chip
            key={finish.id}
            selected={form.finishes.includes(finish.id)}
            onClick={() => toggleInArray('finishes', finish.id)}
          >
            {finish.label}
          </Chip>
        ))}
      </div>
    </FieldShell>

    <FieldShell
      label="Budget range"
      hint="Kept private — it only shapes the proposal"
      error={errors.budget}
      required
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        {BUDGET_RANGES.map((range) => (
          <OptionCard
            key={range.id}
            compact
            title={range.label}
            selected={form.budget === range.id}
            onClick={() => updateForm({ budget: range.id })}
          />
        ))}
      </div>
    </FieldShell>

    <FieldShell label="When do you need it?" error={errors.timeline} required>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {TIMELINES.map((timeline) => (
          <OptionCard
            key={timeline.id}
            compact
            title={timeline.label}
            selected={form.timeline === timeline.id}
            onClick={() => updateForm({ timeline: timeline.id })}
          />
        ))}
      </div>
    </FieldShell>

    <SwitchRow
      checked={form.needsInstallation}
      onChange={(value) => updateForm({ needsInstallation: value })}
      title="Include delivery & installation"
      hint="Our white-glove team places and assembles every piece on site."
    />
  </div>
)
