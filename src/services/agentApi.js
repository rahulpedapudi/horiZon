/**
 * Agent API Service
 * Handles all communication with the Career Guidance Agent API (port 8000)
 */

const AGENT_API_URL =
  import.meta.env.VITE_AGENT_API_URL || "http://localhost:8000";

/**
 * Map frontend exposure level to API enum
 */
const mapExposureLevel = (level) => {
  const mapping = {
    "Just exploring / no hands-on experience": "coursework",
    "Learned basics (courses, tutorials)": "coursework",
    "Built small projects": "small_projects",
    "Built multiple projects": "serious_projects",
    "Professional / real-world experience": "professional",
  };
  return mapping[level] || "coursework";
};

/**
 * Map frontend learning preferences to API format
 */
const mapLearningPreferences = (prefs) => {
  if (!prefs || prefs.length === 0) return [];
  // API accepts max 2 items
  return prefs.slice(0, 2).map((p) => p.toLowerCase().replace(/\s+/g, "-"));
};

/**
 * Submit onboarding data to agent API
 */
export const submitOnboarding = async (userId, userName, onboardingData) => {
  // Build payload with only present fields
  const payload = {
    user_id: userId,
    name: userName || "User",
  };

  // Add optional fields only if they have values
  if (onboardingData.exposure_level) {
    payload.exposure_level = mapExposureLevel(onboardingData.exposure_level);
  }
  if (onboardingData.learning_preferences?.length) {
    payload.learning_preferences = mapLearningPreferences(
      onboardingData.learning_preferences
    );
  }
  if (onboardingData.interests?.length) {
    payload.interests = onboardingData.interests;
  }
  if (onboardingData.goals?.length) {
    payload.goals = onboardingData.goals;
  }
  if (onboardingData.stage) {
    payload.stage = onboardingData.stage;
  }
  if (onboardingData.weekly_time_commitment) {
    payload.weekly_time_commitment = onboardingData.weekly_time_commitment;
  }

  const response = await fetch(`${AGENT_API_URL}/api/onboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Onboarding failed");
  }

  return response.json();
};

/**
 * Submit skills to agent API
 */
export const submitSkills = async (userId, skills) => {
  const response = await fetch(`${AGENT_API_URL}/api/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, skills }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Skills submission failed");
  }

  return response.json();
};

/**
 * Get cached horizon output (no re-run)
 */
export const getHorizon = async (userId) => {
  const response = await fetch(`${AGENT_API_URL}/api/horizon/${userId}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null; // User hasn't completed onboarding
    }
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch horizon");
  }

  return response.json();
};

/**
 * Trigger an event to re-run the pipeline
 */
export const triggerEvent = async (userId, eventType, payload = {}) => {
  const response = await fetch(`${AGENT_API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      event_type: eventType,
      payload,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Event trigger failed");
  }

  return response.json();
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  const response = await fetch(`${AGENT_API_URL}/api/profile/${userId}`);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

/**
 * Health check
 */
export const healthCheck = async () => {
  const response = await fetch(`${AGENT_API_URL}/health`);
  return response.json();
};

export default {
  submitOnboarding,
  submitSkills,
  getHorizon,
  triggerEvent,
  getUserProfile,
  healthCheck,
};
