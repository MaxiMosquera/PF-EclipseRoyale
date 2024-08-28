export enum ReservationStatus {
  PENDING = 'pending', // se confirma cuando se paga
  CANCELED = 'canceled', // se cancela la reserva con anticipacion de x dias, o no se completa el pago en x minutos
  PAID = 'paid', // reserva confirmada una vez paga
  COMPLETED = 'completed', // se termina la reserva
  IN_PROGRESS = 'in_progress', // se inicia la reserva/hospedaje, relevante si para los servicios que solo están disponibles mientras la reserva está activa, tambien para que al usuario le aparezca en curso cuand mire su reserva, y al admin cuando quiera chequear todas las reservas del hotel
  // a ver si funca ahora
}
