import React from "react";

interface ActivitySuggesterProps {
  condition: string;
}

const ActivitySuggester: React.FC<ActivitySuggesterProps> = ({ condition }) => {
  const suggestActivity = () => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "It's a perfect day for a picnic or a walk in the park!";
      case "clouds":
        return "A great day to visit a museum or have a cozy coffee shop visit.";
      case "rain":
        return "Stay indoors and watch a movie or read a book!";
      case "snow":
        return "Perfect for skiing, snowboarding, or building a snowman!";
      case "thunderstorm":
        return "Best to stay inside and enjoy a warm drink.";
      default:
        return "Check the forecast and plan accordingly!";
    }
  };

  return (
    <div className="activity-container">
      <h3>Suggested Activity</h3>
      <p>{suggestActivity()}</p>
    </div>
  );
};

export default ActivitySuggester;