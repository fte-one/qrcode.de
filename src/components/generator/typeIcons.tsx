import {
  LinkIcon,
  Bars3BottomLeftIcon,
  WifiIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  CreditCardIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline'
import type { TypeId } from '@/lib/qr/content'

export const typeIcons: Record<TypeId, typeof LinkIcon> = {
  url: LinkIcon,
  text: Bars3BottomLeftIcon,
  wifi: WifiIcon,
  vcard: IdentificationIcon,
  email: EnvelopeIcon,
  phone: PhoneIcon,
  sms: ChatBubbleBottomCenterTextIcon,
  whatsapp: ChatBubbleOvalLeftEllipsisIcon,
  location: MapPinIcon,
  event: CalendarDaysIcon,
  girocode: BanknotesIcon,
  paypal: CreditCardIcon,
  bitcoin: CircleStackIcon,
}
