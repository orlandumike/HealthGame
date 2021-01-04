namespace ActivityTracker.EntityFrameworkCore.Entities
{
    public class Level
    {
        public int LevelID { get; set; }
        public string Name { get; set; }
        public int ExperienceRequirement { get; set; }
        public string ImageUrl { get; set; }
    }
}
