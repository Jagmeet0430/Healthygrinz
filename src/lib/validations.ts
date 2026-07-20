export type AppointmentPayload = {
  name: string;
  phone: string;
  concern: string;
  message?: string;
  preferredTime?: string;
};

export type ContactPayload = {
  name: string;
  email?: string;
  phone?: string;
  message: string;
};

type ValidationResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      errors: string[];
    };

const text = (value: unknown) => String(value ?? "").trim();

export function validateAppointment(input: unknown): ValidationResult<AppointmentPayload> {
  const payload = input as Partial<AppointmentPayload>;
  const data = {
    name: text(payload.name),
    phone: text(payload.phone),
    concern: text(payload.concern),
    message: text(payload.message),
    preferredTime: text(payload.preferredTime),
  };
  const errors: string[] = [];

  if (!data.name) errors.push("Name is required.");
  if (!data.phone) errors.push("Phone is required.");
  if (!data.concern) errors.push("Concern is required.");

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

export function validateContact(input: unknown): ValidationResult<ContactPayload> {
  const payload = input as Partial<ContactPayload>;
  const data = {
    name: text(payload.name),
    email: text(payload.email),
    phone: text(payload.phone),
    message: text(payload.message),
  };
  const errors: string[] = [];

  if (!data.name) errors.push("Name is required.");
  if (!data.message) errors.push("Message is required.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Email is invalid.");
  }

  return errors.length ? { ok: false, errors } : { ok: true, data };
}
