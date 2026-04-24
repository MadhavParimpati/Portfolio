/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  projects: Project[];
}

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  impact: string[];
  tech: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  description: string;
}
