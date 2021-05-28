using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace practice.Models
{
    public partial class postgresContext : DbContext
    {
        public postgresContext()
        {
        }

        public postgresContext(DbContextOptions<postgresContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Actuator> Actuators { get; set; }
        public virtual DbSet<ActuatorType> ActuatorTypes { get; set; }
        public virtual DbSet<AirDirection> AirDirections { get; set; }
        public virtual DbSet<Bankdetail> Bankdetails { get; set; }
        public virtual DbSet<Building> Buildings { get; set; }
        public virtual DbSet<BuildingType> BuildingTypes { get; set; }
        public virtual DbSet<Command> Commands { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<_Controller> Controllers { get; set; }
        public virtual DbSet<ControllerSensor> ControllerSensors { get; set; }
        public virtual DbSet<Enterprise> Enterprises { get; set; }
        public virtual DbSet<EnterpriseCard> EnterpriseCards { get; set; }
        public virtual DbSet<Excavation> Excavations { get; set; }
        public virtual DbSet<ExcavationForm> ExcavationForms { get; set; }
        public virtual DbSet<ExcavationPosition> ExcavationPositions { get; set; }
        public virtual DbSet<ExcavationType> ExcavationTypes { get; set; }
        public virtual DbSet<InVariable> InVariables { get; set; }
        public virtual DbSet<Manufacture> Manufactures { get; set; }
        public virtual DbSet<ManufactureForm> ManufactureForms { get; set; }
        public virtual DbSet<OutVariable> OutVariables { get; set; }
        public virtual DbSet<Planfile> Planfiles { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Sensor> Sensors { get; set; }
        public virtual DbSet<SensorType> SensorTypes { get; set; }
        public virtual DbSet<TechConfiguration> TechConfigurations { get; set; }
        public virtual DbSet<TechObject> TechObjects { get; set; }
        public virtual DbSet<TechState> TechStates { get; set; }
        public virtual DbSet<TechSystem> TechSystems { get; set; }
        public virtual DbSet<TechSystemType> TechSystemTypes { get; set; }
        public virtual DbSet<Unit> Units { get; set; }
        public virtual DbSet<UnitType> UnitTypes { get; set; }
        public virtual DbSet<Variable> Variables { get; set; }
        public virtual DbSet<VariableType> VariableTypes { get; set; }
        public virtual DbSet<Staff> staff { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=kakdela");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("adminpack")
                .HasAnnotation("Relational:Collation", "Russian_Russia.1251");

            modelBuilder.Entity<Actuator>(entity =>
            {
                entity.ToTable("actuator");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActuatorName)
                    .HasMaxLength(100)
                    .HasColumnName("actuator_name");

                entity.Property(e => e.ActuatorState)
                    .HasMaxLength(50)
                    .HasColumnName("actuator_state");

                entity.Property(e => e.IdActuatorType).HasColumnName("id_actuator_type");

                entity.Property(e => e.IdOutVariable).HasColumnName("id_out_variable");

                entity.HasOne(d => d.IdActuatorTypeNavigation)
                    .WithMany(p => p.Actuators)
                    .HasForeignKey(d => d.IdActuatorType)
                    .HasConstraintName("actuator_id_actuator_type_fkey");

                entity.HasOne(d => d.IdOutVariableNavigation)
                    .WithMany(p => p.Actuators)
                    .HasForeignKey(d => d.IdOutVariable)
                    .HasConstraintName("actuator_id_out_variable_fkey");
            });

            modelBuilder.Entity<ActuatorType>(entity =>
            {
                entity.ToTable("actuator_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActuatorTypeName)
                    .HasMaxLength(100)
                    .HasColumnName("actuator_type_name");

                entity.Property(e => e.MaxValue)
                    .HasMaxLength(50)
                    .HasColumnName("max_value");

                entity.Property(e => e.MinValue)
                    .HasMaxLength(50)
                    .HasColumnName("min_value");
            });

            modelBuilder.Entity<AirDirection>(entity =>
            {
                entity.ToTable("air_direction");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Direction).HasColumnName("direction");
            });

            modelBuilder.Entity<Bankdetail>(entity =>
            {
                entity.ToTable("bankdetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BankName)
                    .HasMaxLength(50)
                    .HasColumnName("bank_name");

                entity.Property(e => e.CheckingAcc)
                    .HasMaxLength(20)
                    .HasColumnName("checking_acc");

                entity.Property(e => e.CorrAcc)
                    .HasMaxLength(20)
                    .HasColumnName("corr_acc");

                entity.Property(e => e.Inn)
                    .HasMaxLength(10)
                    .HasColumnName("inn");

                entity.Property(e => e.Kpp)
                    .HasMaxLength(9)
                    .HasColumnName("kpp");
            });

            modelBuilder.Entity<Building>(entity =>
            {
                entity.ToTable("building");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BuildingName)
                    .HasMaxLength(100)
                    .HasColumnName("building_name");

                entity.Property(e => e.IdBuildingType).HasColumnName("id_building_type");

                entity.Property(e => e.IdManufacture).HasColumnName("id_manufacture");

                entity.HasOne(d => d.IdBuildingTypeNavigation)
                    .WithMany(p => p.Buildings)
                    .HasForeignKey(d => d.IdBuildingType)
                    .HasConstraintName("building_id_building_type_fkey");

                entity.HasOne(d => d.IdManufactureNavigation)
                    .WithMany(p => p.Buildings)
                    .HasForeignKey(d => d.IdManufacture)
                    .HasConstraintName("building_id_manufacture_fkey");
            });

            modelBuilder.Entity<BuildingType>(entity =>
            {
                entity.ToTable("building_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BuildingTypeName)
                    .HasMaxLength(100)
                    .HasColumnName("building_type_name");
            });

            modelBuilder.Entity<Command>(entity =>
            {
                entity.ToTable("command");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CommandTimestamp).HasColumnName("command_timestamp");

                entity.Property(e => e.CommandValue)
                    .HasMaxLength(50)
                    .HasColumnName("command_value");

                entity.Property(e => e.IdActuator).HasColumnName("id_actuator");

                entity.Property(e => e.IdController).HasColumnName("id_controller");

                entity.Property(e => e.Order)
                    .HasColumnName("order")
                    .HasDefaultValueSql("nextval('command_priority_seq'::regclass)");

                entity.HasOne(d => d.IdActuatorNavigation)
                    .WithMany(p => p.Commands)
                    .HasForeignKey(d => d.IdActuator)
                    .HasConstraintName("command_id_actuator_fkey");

                entity.HasOne(d => d.IdControllerNavigation)
                    .WithMany(p => p.Commands)
                    .HasForeignKey(d => d.IdController)
                    .HasConstraintName("command_id_controller_fkey");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contact");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<_Controller>(entity =>
            {
                entity.ToTable("controller");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('controller_id_seq1'::regclass)");

                entity.Property(e => e.ControllerName)
                    .HasMaxLength(50)
                    .HasColumnName("controller_name");

                entity.Property(e => e.IdConfiguration).HasColumnName("id_configuration");

                entity.Property(e => e.IdState).HasColumnName("id_state");

                entity.HasOne(d => d.IdConfigurationNavigation)
                    .WithMany(p => p.Controllers)
                    .HasForeignKey(d => d.IdConfiguration)
                    .HasConstraintName("controller_id_configuration_fkey");

                entity.HasOne(d => d.IdStateNavigation)
                    .WithMany(p => p.Controllers)
                    .HasForeignKey(d => d.IdState)
                    .HasConstraintName("controller_id_state_fkey");
            });

            modelBuilder.Entity<ControllerSensor>(entity =>
            {
                entity.ToTable("controller_sensors");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdController).HasColumnName("id_controller");

                entity.Property(e => e.IdSensor).HasColumnName("id_sensor");

                entity.HasOne(d => d.IdControllerNavigation)
                    .WithMany(p => p.ControllerSensors)
                    .HasForeignKey(d => d.IdController)
                    .HasConstraintName("controller_sensors_id_controller_fkey");

                entity.HasOne(d => d.IdSensorNavigation)
                    .WithMany(p => p.ControllerSensors)
                    .HasForeignKey(d => d.IdSensor)
                    .HasConstraintName("controller_sensors_id_sensor_fkey");
            });

            modelBuilder.Entity<Enterprise>(entity =>
            {
                entity.ToTable("enterprise");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Coordinates).HasColumnName("coordinates");

                entity.Property(e => e.HeadEnterprise).HasColumnName("head_enterprise");

                entity.Property(e => e.IdCard).HasColumnName("id_card");

                entity.Property(e => e.IdPlanfiles).HasColumnName("id_planfiles");

                entity.HasOne(d => d.HeadEnterpriseNavigation)
                    .WithMany(p => p.Enterprises)
                    .HasForeignKey(d => d.HeadEnterprise)
                    .HasConstraintName("enterprise_headofenterprise_fkey");

                entity.HasOne(d => d.IdCardNavigation)
                    .WithMany(p => p.Enterprises)
                    .HasForeignKey(d => d.IdCard)
                    .HasConstraintName("enterprise_id_card_fkey");

                entity.HasOne(d => d.IdPlanfilesNavigation)
                    .WithMany(p => p.Enterprises)
                    .HasForeignKey(d => d.IdPlanfiles)
                    .HasConstraintName("enterprise_id_planfiles_fkey");
            });

            modelBuilder.Entity<EnterpriseCard>(entity =>
            {
                entity.ToTable("enterprise_card");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EnterpriseNameL)
                    .HasMaxLength(200)
                    .HasColumnName("enterprise_name_l");

                entity.Property(e => e.EnterpriseNameS)
                    .HasMaxLength(50)
                    .HasColumnName("enterprise_name_s");

                entity.Property(e => e.IdBankdetails).HasColumnName("id_bankdetails");

                entity.Property(e => e.IdContact).HasColumnName("id_contact");

                entity.Property(e => e.Ogrn)
                    .HasMaxLength(13)
                    .HasColumnName("ogrn");

                entity.HasOne(d => d.IdBankdetailsNavigation)
                    .WithMany(p => p.EnterpriseCards)
                    .HasForeignKey(d => d.IdBankdetails)
                    .HasConstraintName("enterprise_card_id_bankdetails_fkey");

                entity.HasOne(d => d.IdContactNavigation)
                    .WithMany(p => p.EnterpriseCards)
                    .HasForeignKey(d => d.IdContact)
                    .HasConstraintName("enterprise_card_id_contact_fkey");
            });

            modelBuilder.Entity<Excavation>(entity =>
            {
                entity.ToTable("excavation");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Angle).HasColumnName("angle");

                entity.Property(e => e.ExcDiameter).HasColumnName("exc_diameter");

                entity.Property(e => e.ExcLength).HasColumnName("exc_length");

                entity.Property(e => e.ExcavationName)
                    .HasMaxLength(100)
                    .HasColumnName("excavation_name");

                entity.Property(e => e.IdAirDirection).HasColumnName("id_air_direction");

                entity.Property(e => e.IdExcavationForm).HasColumnName("id_excavation_form");

                entity.Property(e => e.IdExcavationType).HasColumnName("id_excavation_type");

                entity.Property(e => e.IdTechObj).HasColumnName("id_tech_obj");

                entity.Property(e => e.Iscircular).HasColumnName("iscircular");

                entity.Property(e => e.Roughness).HasColumnName("roughness");

                entity.HasOne(d => d.IdAirDirectionNavigation)
                    .WithMany(p => p.Excavations)
                    .HasForeignKey(d => d.IdAirDirection)
                    .HasConstraintName("excavation_id_air_direction_fkey");

                entity.HasOne(d => d.IdExcavationFormNavigation)
                    .WithMany(p => p.Excavations)
                    .HasForeignKey(d => d.IdExcavationForm)
                    .HasConstraintName("excavation_id_excavation_form_fkey");

                entity.HasOne(d => d.IdExcavationTypeNavigation)
                    .WithMany(p => p.Excavations)
                    .HasForeignKey(d => d.IdExcavationType)
                    .HasConstraintName("excavation_id_excavation_type_fkey");

                entity.HasOne(d => d.IdTechObjNavigation)
                    .WithMany(p => p.Excavations)
                    .HasForeignKey(d => d.IdTechObj)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("excavation_id_tech_obj_fkey");
            });

            modelBuilder.Entity<ExcavationForm>(entity =>
            {
                entity.ToTable("excavation_form");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ExcavationFormName)
                    .HasMaxLength(50)
                    .HasColumnName("excavation_form_name");
            });

            modelBuilder.Entity<ExcavationPosition>(entity =>
            {
                entity.ToTable("excavation_position");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ExcPosition)
                    .HasMaxLength(100)
                    .HasColumnName("exc_position");
            });

            modelBuilder.Entity<ExcavationType>(entity =>
            {
                entity.ToTable("excavation_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ExcavationTypeName)
                    .HasMaxLength(100)
                    .HasColumnName("excavation_type_name");

                entity.Property(e => e.IdPosition).HasColumnName("id_position");

                entity.Property(e => e.LengthMax).HasColumnName("length_max");

                entity.Property(e => e.LengthMin).HasColumnName("length_min");

                entity.HasOne(d => d.IdPositionNavigation)
                    .WithMany(p => p.ExcavationTypes)
                    .HasForeignKey(d => d.IdPosition)
                    .HasConstraintName("excavation_type_id_position_fkey");
            });

            modelBuilder.Entity<InVariable>(entity =>
            {
                entity.ToTable("in_variable");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdVariable).HasColumnName("id_variable");

                entity.Property(e => e.InVariableTimestamp).HasColumnName("in_variable_timestamp");

                entity.Property(e => e.InVariableValue)
                    .HasMaxLength(50)
                    .HasColumnName("in_variable_value");

                entity.HasOne(d => d.IdVariableNavigation)
                    .WithMany(p => p.InVariables)
                    .HasForeignKey(d => d.IdVariable)
                    .HasConstraintName("in_variable_id_variable_fkey");
            });

            modelBuilder.Entity<Manufacture>(entity =>
            {
                entity.ToTable("manufacture");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Coordinates).HasColumnName("coordinates");

                entity.Property(e => e.IdBoss).HasColumnName("id_boss");

                entity.Property(e => e.IdContact).HasColumnName("id_contact");

                entity.Property(e => e.IdEnterprise).HasColumnName("id_enterprise");

                entity.Property(e => e.IdManufactureForm).HasColumnName("id_manufacture_form");

                entity.Property(e => e.ManufactureName)
                    .HasMaxLength(50)
                    .HasColumnName("manufacture_name");

                entity.HasOne(d => d.IdBossNavigation)
                    .WithMany(p => p.Manufactures)
                    .HasForeignKey(d => d.IdBoss)
                    .HasConstraintName("manufacture_id_boss_fkey");

                entity.HasOne(d => d.IdContactNavigation)
                    .WithMany(p => p.Manufactures)
                    .HasForeignKey(d => d.IdContact)
                    .HasConstraintName("manufacture_id_contact_fkey");

                entity.HasOne(d => d.IdEnterpriseNavigation)
                    .WithMany(p => p.Manufactures)
                    .HasForeignKey(d => d.IdEnterprise)
                    .HasConstraintName("manufacture_id_enterprise_fkey");

                entity.HasOne(d => d.IdManufactureFormNavigation)
                    .WithMany(p => p.Manufactures)
                    .HasForeignKey(d => d.IdManufactureForm)
                    .HasConstraintName("manufacture_id_manufacture_form_fkey");
            });

            modelBuilder.Entity<ManufactureForm>(entity =>
            {
                entity.ToTable("manufacture_form");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ManufactureTypeName)
                    .HasMaxLength(50)
                    .HasColumnName("manufacture_type_name");
            });

            modelBuilder.Entity<OutVariable>(entity =>
            {
                entity.ToTable("out_variable");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdVariable).HasColumnName("id_variable");

                entity.Property(e => e.OutVariableTimestamp).HasColumnName("out_variable_timestamp");

                entity.Property(e => e.OutVariableValue)
                    .HasMaxLength(10)
                    .HasColumnName("out_variable_value");

                entity.HasOne(d => d.IdVariableNavigation)
                    .WithMany(p => p.OutVariables)
                    .HasForeignKey(d => d.IdVariable)
                    .HasConstraintName("out_variable_id_variable_fkey");
            });

            modelBuilder.Entity<Planfile>(entity =>
            {
                entity.ToTable("planfiles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Modellink).HasColumnName("modellink");

                entity.Property(e => e.Planlink).HasColumnName("planlink");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Postname)
                    .HasMaxLength(50)
                    .HasColumnName("postname");
            });

            modelBuilder.Entity<Sensor>(entity =>
            {
                entity.ToTable("sensor");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdInVariable).HasColumnName("id_in_variable");

                entity.Property(e => e.IdSensorType).HasColumnName("id_sensor_type");

                entity.Property(e => e.SensorName)
                    .HasMaxLength(50)
                    .HasColumnName("sensor_name");

                entity.HasOne(d => d.IdInVariableNavigation)
                    .WithMany(p => p.Sensors)
                    .HasForeignKey(d => d.IdInVariable)
                    .HasConstraintName("sensor_id_in_variable_fkey");

                entity.HasOne(d => d.IdSensorTypeNavigation)
                    .WithMany(p => p.Sensors)
                    .HasForeignKey(d => d.IdSensorType)
                    .HasConstraintName("sensor_id_sensor_type_fkey");
            });

            modelBuilder.Entity<SensorType>(entity =>
            {
                entity.ToTable("sensor_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.MaxValue)
                    .HasMaxLength(50)
                    .HasColumnName("max_value");

                entity.Property(e => e.MinValue)
                    .HasMaxLength(50)
                    .HasColumnName("min_value");

                entity.Property(e => e.SensorTypeName)
                    .HasMaxLength(50)
                    .HasColumnName("sensor_type_name");
            });

            modelBuilder.Entity<TechConfiguration>(entity =>
            {
                entity.ToTable("tech_configuration");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ConfigurationName)
                    .HasMaxLength(100)
                    .HasColumnName("configuration_name");

                entity.Property(e => e.MaxSensors).HasColumnName("max_sensors");

                entity.Property(e => e.TimeRange)
                    .HasColumnType("time without time zone")
                    .HasColumnName("time_range");
            });

            modelBuilder.Entity<TechObject>(entity =>
            {
                entity.ToTable("tech_object");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdManufacture).HasColumnName("id_manufacture");

                entity.Property(e => e.OperationEndDate)
                    .HasColumnType("date")
                    .HasColumnName("operation_end_date");

                entity.Property(e => e.OperationStartDate)
                    .HasColumnType("date")
                    .HasColumnName("operation_start_date");

                entity.Property(e => e.Square).HasColumnName("square");

                entity.Property(e => e.TechObjectName)
                    .HasMaxLength(100)
                    .HasColumnName("tech_object_name");

                entity.HasOne(d => d.IdManufactureNavigation)
                    .WithMany(p => p.TechObjects)
                    .HasForeignKey(d => d.IdManufacture)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("tech_object_id_manufacture_fkey");
            });

            modelBuilder.Entity<TechState>(entity =>
            {
                entity.ToTable("tech_state");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.StateName)
                    .HasMaxLength(100)
                    .HasColumnName("state_name");

                entity.Property(e => e.StateValue)
                    .HasMaxLength(50)
                    .HasColumnName("state_value");
            });

            modelBuilder.Entity<TechSystem>(entity =>
            {
                entity.ToTable("tech_system");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdSystemType).HasColumnName("id_system_type");

                entity.Property(e => e.IdTechObj).HasColumnName("id_tech_obj");

                entity.Property(e => e.TechSystemName)
                    .HasMaxLength(100)
                    .HasColumnName("tech_system_name");

                entity.HasOne(d => d.IdSystemTypeNavigation)
                    .WithMany(p => p.TechSystems)
                    .HasForeignKey(d => d.IdSystemType)
                    .HasConstraintName("tech_system_id_system_type_fkey");

                entity.HasOne(d => d.IdTechObjNavigation)
                    .WithMany(p => p.TechSystems)
                    .HasForeignKey(d => d.IdTechObj)
                    .HasConstraintName("tech_system_id_tech_obj_fkey");
            });

            modelBuilder.Entity<TechSystemType>(entity =>
            {
                entity.ToTable("tech_system_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.SystemTypeName)
                    .HasMaxLength(100)
                    .HasColumnName("system_type_name");
            });

            modelBuilder.Entity<Unit>(entity =>
            {
                entity.ToTable("unit");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdSystem).HasColumnName("id_system");

                entity.Property(e => e.IdUnitType).HasColumnName("id_unit_type");

                entity.Property(e => e.OperationEndDate)
                    .HasColumnType("date")
                    .HasColumnName("operation_end_date");

                entity.Property(e => e.OperationStartDate)
                    .HasColumnType("date")
                    .HasColumnName("operation_start_date");

                entity.Property(e => e.UnitName)
                    .HasMaxLength(50)
                    .HasColumnName("unit_name");

                entity.HasOne(d => d.IdSystemNavigation)
                    .WithMany(p => p.Units)
                    .HasForeignKey(d => d.IdSystem)
                    .HasConstraintName("unit_id_system_fkey");

                entity.HasOne(d => d.IdUnitTypeNavigation)
                    .WithMany(p => p.Units)
                    .HasForeignKey(d => d.IdUnitType)
                    .HasConstraintName("unit_id_unit_type_fkey");
            });

            modelBuilder.Entity<UnitType>(entity =>
            {
                entity.ToTable("unit_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('unittype_id_seq'::regclass)");

                entity.Property(e => e.MaxValue).HasColumnName("max_value");

                entity.Property(e => e.MinValue).HasColumnName("min_value");

                entity.Property(e => e.UnitTypeName)
                    .HasMaxLength(100)
                    .HasColumnName("unit_type_name");
            });

            modelBuilder.Entity<Variable>(entity =>
            {
                entity.ToTable("variable");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdVariableType).HasColumnName("id_variable_type");

                entity.Property(e => e.VariableName)
                    .HasMaxLength(50)
                    .HasColumnName("variable_name");

                entity.HasOne(d => d.IdVariableTypeNavigation)
                    .WithMany(p => p.Variables)
                    .HasForeignKey(d => d.IdVariableType)
                    .HasConstraintName("variable_id_variable_type_fkey");
            });

            modelBuilder.Entity<VariableType>(entity =>
            {
                entity.ToTable("variable_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DataType)
                    .HasMaxLength(20)
                    .HasColumnName("data_type");

                entity.Property(e => e.MaxValue).HasColumnName("max_value");

                entity.Property(e => e.MinValue).HasColumnName("min_value");

                entity.Property(e => e.VariableTypeName)
                    .HasMaxLength(50)
                    .HasColumnName("variable_type_name");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("date")
                    .HasColumnName("date_of_birth");

                entity.Property(e => e.DismissDate)
                    .HasColumnType("date")
                    .HasColumnName("dismiss_date");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(100)
                    .HasColumnName("fullname");

                entity.Property(e => e.HireDate)
                    .HasColumnType("date")
                    .HasColumnName("hire_date");

                entity.Property(e => e.IdContact).HasColumnName("id_contact");

                entity.Property(e => e.IdPost).HasColumnName("id_post");

                entity.Property(e => e.IdTechObject).HasColumnName("id_techobj");

                entity.HasOne(d => d.IdContactNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.IdContact)
                    .HasConstraintName("staff_id_contact_fkey");

                entity.HasOne(d => d.IdPostNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.IdPost)
                    .HasConstraintName("staff_id_post_fkey");

                entity.HasOne(d => d.IdTechObjectNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.IdTechObject)
                    .HasConstraintName("staff_id_techobj_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
