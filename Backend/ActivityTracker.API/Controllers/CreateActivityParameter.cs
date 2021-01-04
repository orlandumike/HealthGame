using System;

namespace ActivityTracker.API.Controllers
{
    public class CreateActivityParameter
    {
        public string ActivityTypeCode { get; set; }
        public int Quantity { get; set; }
        public string ExternalId { get; set; }
        public DateTime? CreationDate { get; set; }  // Optionnel, requis lorsque l'activité est importée d'un système externe, sinon DateTime.NowUTC
    }
}