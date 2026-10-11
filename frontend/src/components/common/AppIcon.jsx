import React from 'react';
import {
  Scale,
  Gavel,
  Landmark,
  Columns,
  ListOrdered,
  BookOpen,
  Bell,
  Search,
  SlidersHorizontal,
  Bot,
  HelpCircle,
  PlusCircle,
  Filter,
  ShieldCheck,
  RefreshCw,
  Download,
  FileText,
  Award,
  FileEdit,
  Clock,
  ArrowRight,
  ArrowLeft,
  MoreVertical,
  Eye,
  Copy,
  UserCheck,
  Headphones,
  X,
  Check,
  CheckCircle2,
  Hourglass,
  FolderOpen,
  Calendar,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Scroll,
  History,
  Share2,
  Mail,
  Phone,
  MapPin,
  Send,
  Shield,
  Upload,
  Sparkles,
  Lock,
  Layers,
  Printer,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Hash,
  RotateCcw,
  BookMarked,
  Info,
  ChevronsUpDown,
  Megaphone,
  ChevronLeft,
  Maximize2,
  Minimize2,
  FileCheck,
  CheckSquare,
  Star,
  Bookmark,
  AlertCircle,
  List,
  MessageSquare,
  Brain,
  Wand2,
  Languages,
  Truck,
  Receipt,
  LayoutGrid,
} from 'lucide-react';

/**
 * High-definition legal emblem balance scale for Supreme Court of India branding
 */
export function LegalScalesSvg({ className = 'w-5 h-5 text-current', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 6h14" />
      <path d="M5 6l-3 7h6l-3-7z" fill="currentColor" fillOpacity="0.2" />
      <path d="M19 6l-3 7h6l-3-7z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <path d="M8 21h8" />
    </svg>
  );
}

// Comprehensive icon mapping from Material Symbol names / common names to Lucide SVG icons
const ICON_MAP = {
  // Brand & Justice
  balance: LegalScalesSvg,
  scales: LegalScalesSvg,
  scale: Scale,
  gavel: Gavel,
  court: Landmark,
  account_balance: Landmark,
  domain: Landmark,

  // Navigation & Workspace
  splitscreen: Columns,
  columns: Columns,
  format_list_numbered: ListOrdered,
  menu_book: BookOpen,
  book_open: BookOpen,
  notifications: Bell,
  notifications_active: Bell,
  bell: Bell,
  translate: Languages,
  languages: Languages,

  // Search & Utilities
  search: Search,
  tune: SlidersHorizontal,
  filter_alt: Filter,
  filter: Filter,
  smart_toy: Bot,
  bot: Bot,
  psychology: Brain,
  auto_fix_high: Wand2,
  chat: MessageSquare,
  message: MessageSquare,
  sparkles: Sparkles,
  help_outline: HelpCircle,
  help: HelpCircle,
  add_circle: PlusCircle,
  plus: PlusCircle,
  post_add: FileEdit,
  add: PlusCircle,

  // Trust, Verified & Security
  verified: ShieldCheck,
  verified_user: ShieldCheck,
  shield: Shield,
  security: ShieldCheck,
  digiseal: ShieldCheck,
  lock: Lock,
  how_to_reg: UserCheck,
  fact_check: FileCheck,
  task: FileCheck,
  policy: Shield,

  // Sync & Download
  cached: RefreshCw,
  sync: RefreshCw,
  refresh: RefreshCw,
  autorenew: RefreshCw,
  download: Download,
  file_download: Download,

  // Logistics & Receipts
  local_shipping: Truck,
  shipping: Truck,
  receipt_long: Receipt,
  receipt: Receipt,

  // Files & PDF
  picture_as_pdf: FileText,
  description: FileText,
  file: FileText,
  article: FileText,
  edit_document: FileEdit,
  auto_stories: BookOpen,
  scroll: Scroll,
  history_edu: Scroll,
  book_marked: BookMarked,
  check_square: CheckSquare,
  list_alt: List,
  bookmark: Bookmark,
  star: Star,
  notification_important: AlertCircle,

  // Time & Status
  timer: Clock,
  clock: Clock,
  event_note: Calendar,
  calendar: Calendar,
  hourglass_top: Hourglass,
  hourglass: Hourglass,
  pending: Hourglass,
  check_circle: CheckCircle2,
  check: Check,
  close: X,
  x: X,

  // Analytics & Folders
  trending_up: TrendingUp,
  folder_special: FolderOpen,
  folder: FolderOpen,
  layers: Layers,
  workspace_premium: Award,
  award: Award,
  campaign: Megaphone,
  announcement: Megaphone,

  // Actions & Controls
  visibility: Eye,
  eye: Eye,
  content_copy: Copy,
  copy: Copy,
  more_vert: MoreVertical,
  apps: LayoutGrid,
  arrow_forward: ArrowRight,
  arrow_back: ArrowLeft,
  arrow_drop_down: ChevronDown,
  chevron_down: ChevronDown,
  expand_more: ChevronDown,
  chevron_up: ChevronUp,
  expand_less: ChevronUp,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  fullscreen: Maximize2,
  fullscreen_exit: Minimize2,
  open_in_new: ExternalLink,
  external_link: ExternalLink,
  share: Share2,
  printer: Printer,
  print: Printer,
  upload_file: Upload,
  upload: Upload,
  cloud_upload: Upload,
  hash: Hash,
  rotate_ccw: RotateCcw,
  info: Info,
  chevrons_up_down: ChevronsUpDown,

  // Communication & Support
  support_agent: Headphones,
  mail: Mail,
  call: Phone,
  phone: Phone,
  map: MapPin,
  send: Send,
  history: History,
};

/**
 * Universal SVG Icon component.
 * Supports both:
 *   <AppIcon name="gavel" className="w-4 h-4 text-secondary" />
 * and
 *   <AppIcon className="w-4 h-4 text-secondary">gavel</AppIcon>
 */
export function AppIcon({
  name,
  children,
  className = 'w-4 h-4 inline-block align-middle shrink-0',
  size,
  strokeWidth = 2,
  ...props
}) {
  const iconKey = (name || (typeof children === 'string' ? children : '') || '')
    .trim()
    .toLowerCase();

  const IconComponent = ICON_MAP[iconKey];

  if (IconComponent) {
    return (
      <IconComponent
        className={className}
        size={size}
        strokeWidth={strokeWidth}
        aria-hidden="true"
        {...props}
      />
    );
  }

  // Graceful fallback: render a clean document/action SVG rather than raw text
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export default AppIcon;
