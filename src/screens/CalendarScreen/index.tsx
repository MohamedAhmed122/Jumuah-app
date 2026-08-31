import { View } from "react-native";

import { styles } from "./CalendarScreen.styles";
import { CalendarGrid } from "./components/CalendarGrid";
import { CalendarHeader } from "./components/CalendarHeader";
import { EventLegend } from "./components/EventLegend";
import { MonthNavigator } from "./components/MonthNavigator";
import { WeekdayHeader } from "./components/WeekdayHeader";
import { useCalendarScreen } from "./hooks/CalendarScreen.hooks";

export default function CalendarScreen() {
  const screen = useCalendarScreen();

  return (
    <View style={[styles.root, screen.rootStyle]}>
      <CalendarHeader onBack={screen.onBack} title={screen.title} />
      <MonthNavigator
        gregorianMonth={screen.gregorianMonth}
        hijriMonth={screen.hijriMonth}
        onNext={screen.onNextMonth}
        onPrevious={screen.onPreviousMonth}
      />
      <WeekdayHeader />
      <CalendarGrid cells={screen.cells} />
      <EventLegend items={screen.legend} />
    </View>
  );
}
