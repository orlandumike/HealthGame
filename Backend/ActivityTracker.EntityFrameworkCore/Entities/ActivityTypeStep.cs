namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class ActivityTypeStep
    {
        public int ActivityTypeStepID { get; set; }
        public int ActivityTypeID { get; set; }
        public int Requirement { get; set; }

        public ActivityType ActivityType { get; set; }
    }
}
