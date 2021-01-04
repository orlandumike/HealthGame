namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class ActivityType
    {
        public int ActivityTypeID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public double QuantityMultiplier { get; set; }
    }
}
