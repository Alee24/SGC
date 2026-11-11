import React from "react";
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  Award,
  GraduationCap,
} from "lucide-react";
import { HISTORY_TIMELINE } from "@/data/school-data";
import styles from "./HeritageTimeline.module.css";

const TIMELINE_ICONS = [
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Users,
  Award,
  GraduationCap,
];

const TYPE_CLASSES = [styles.type1, styles.type2, styles.type3];

export const HeritageTimeline: React.FC = () => {
  return (
    <div className={styles.timeline}>
      {HISTORY_TIMELINE.map((item, idx) => {
        const Icon = TIMELINE_ICONS[idx % TIMELINE_ICONS.length];
        const typeClass = TYPE_CLASSES[idx % TYPE_CLASSES.length];
        const isOdd = idx % 2 === 0; // Matches CSS :nth-child(2n + 1) alternating layout

        return (
          <div
            key={item.year}
            className={`${styles.event} ${isOdd ? styles.eventOdd : ""} ${typeClass}`}
          >
            <div className={styles.icon} aria-hidden="true">
              <Icon className="w-7 h-7" strokeWidth={2} />
            </div>

            <div className={styles.date}>{item.year}</div>

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.description}>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
