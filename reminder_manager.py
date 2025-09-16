import json
import datetime
from typing import List, Optional

class Reminder:
    """
    A class to represent a reminder for a todo item.

    Attributes
    ----------
    id : int
        Unique identifier for the reminder
    task_id : int
        The id of the associated todo task
    reminder_time : datetime.datetime
        The datetime for when the reminder should trigger
    message : str
        The message to display when the reminder triggers
    snoozed : bool
        Indicates if the reminder has been snoozed
    """

    def __init__(self, id: int, task_id: int, reminder_time: datetime.datetime, message: str):
        self.id = id
        self.task_id = task_id
        self.reminder_time = reminder_time
        self.message = message
        self.snoozed = False

    def snooze(self, minutes: int):
        """Snooze the reminder for a specified number of minutes."""
        self.reminder_time += datetime.timedelta(minutes=minutes)
        self.snoozed = True

    def dismiss(self):
        """Dismiss the reminder."""
        self.snoozed = False

class ReminderManager:
    """
    A class to manage reminders for todo tasks.

    Attributes
    ----------
    reminders : List[Reminder]
        List to store all reminders
    """

    def __init__(self):
        self.reminders: List[Reminder] = []

    def add_reminder(self, task_id: int, reminder_time: datetime.datetime, message: str) -> Reminder:
        """Add a new reminder."""
        new_id = len(self.reminders) + 1  # Simple ID generation
        reminder = Reminder(new_id, task_id, reminder_time, message)
        self.reminders.append(reminder)
        return reminder

    def modify_reminder(self, reminder_id: int, new_time: Optional[datetime.datetime] = None, new_message: Optional[str] = None):
        """Modify an existing reminder."""
        reminder = self.get_reminder(reminder_id)
        if reminder:
            if new_time:
                reminder.reminder_time = new_time
            if new_message:
                reminder.message = new_message

    def delete_reminder(self, reminder_id: int):
        """Delete a reminder by ID."""
        self.reminders = [reminder for reminder in self.reminders if reminder.id != reminder_id]

    def get_reminder(self, reminder_id: int) -> Optional[Reminder]:
        """Retrieve a reminder by ID."""
        for reminder in self.reminders:
            if reminder.id == reminder_id:
                return reminder
        return None

    def get_upcoming_reminders(self) -> List[Reminder]:
        """Get all upcoming reminders."""
        now = datetime.datetime.now()
        return [reminder for reminder in self.reminders if reminder.reminder_time > now]

# Example usage
if __name__ == '__main__':
    manager = ReminderManager()
    reminder_time = datetime.datetime(2025, 9, 17, 12, 0)
    reminder = manager.add_reminder(1, reminder_time, "Don't forget to attend the meeting!")
    print(f'Reminder set for task 1: {reminder.message} at {reminder.reminder_time}')