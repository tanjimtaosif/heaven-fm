import { ShieldCheck } from 'lucide-react'
import { SERVICE_CITIES } from '@/constants/quotationData'
import {
  SelectField,
  StepIntro,
  SwitchRow,
  TextAreaField,
  TextField,
} from '../QuotationFields'

export const ContactStep = ({ form, errors, updateForm }) => (
  <div className="space-y-7">
    <StepIntro
      eyebrow="Step 3 of 5"
      title="Where should we reach you?"
      description="Your quote and appointment confirmation go straight to this number on WhatsApp."
    />

    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label="Full name"
        required
        autoComplete="name"
        placeholder="e.g. Tanvir Ahmed"
        value={form.fullName}
        error={errors.fullName}
        onChange={(e) => updateForm({ fullName: e.target.value })}
      />

      <TextField
        label="Phone number"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="01712 345678"
        value={form.phone}
        error={errors.phone}
        onChange={(e) => updateForm({ phone: e.target.value })}
      />
    </div>

    <SwitchRow
      checked={form.whatsappSameAsPhone}
      onChange={(value) => updateForm({ whatsappSameAsPhone: value })}
      title="This number is on WhatsApp"
      hint="Turn off if you use a different number for WhatsApp."
    />

    {!form.whatsappSameAsPhone && (
      <div className="animate-fade-up">
        <TextField
          label="WhatsApp number"
          required
          type="tel"
          inputMode="tel"
          placeholder="01812 345678"
          value={form.whatsappNumber}
          error={errors.whatsappNumber}
          onChange={(e) => updateForm({ whatsappNumber: e.target.value })}
        />
      </div>
    )}

    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        label="Email"
        hint="Optional"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        error={errors.email}
        onChange={(e) => updateForm({ email: e.target.value })}
      />

      <SelectField
        label="City / district"
        required
        options={SERVICE_CITIES}
        value={form.city}
        error={errors.city}
        onChange={(e) => updateForm({ city: e.target.value })}
      />
    </div>

    <TextAreaField
      label="Delivery address"
      hint="Area, road, building — as detailed as you can"
      required
      placeholder="House 12, Road 4, Agrabad Access Road, Chattogram"
      value={form.address}
      error={errors.address}
      onChange={(e) => updateForm({ address: e.target.value })}
    />

    <p className="text-text-muted border-border-subtle bg-surface-muted/50 text-label-sm flex items-start gap-2 rounded-2xl border p-3.5 leading-relaxed">
      <ShieldCheck className="text-brass mt-px h-4 w-4 shrink-0" />
      Your details travel only to our studio WhatsApp — we never share or sell
      them, and nothing is stored on this website beyond your own browser.
    </p>
  </div>
)
