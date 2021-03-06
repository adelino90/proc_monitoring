USE [master]
GO
/****** Object:  Database [APP]    Script Date: 14/07/2017 4:28:07 PM ******/
CREATE DATABASE [APP]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'APP', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\APP.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'APP_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\APP_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [APP] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [APP].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [APP] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [APP] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [APP] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [APP] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [APP] SET ARITHABORT OFF 
GO
ALTER DATABASE [APP] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [APP] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [APP] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [APP] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [APP] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [APP] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [APP] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [APP] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [APP] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [APP] SET  DISABLE_BROKER 
GO
ALTER DATABASE [APP] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [APP] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [APP] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [APP] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [APP] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [APP] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [APP] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [APP] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [APP] SET  MULTI_USER 
GO
ALTER DATABASE [APP] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [APP] SET DB_CHAINING OFF 
GO
ALTER DATABASE [APP] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [APP] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [APP] SET DELAYED_DURABILITY = DISABLED 
GO
USE [APP]
GO
/****** Object:  Table [dbo].[procurement_tbl]    Script Date: 14/07/2017 4:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[procurement_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code_PAP] [nvarchar](50) NULL,
	[pr_no] [nvarchar](50) NULL,
	[PO_JO] [nvarchar](50) NULL,
	[program_proj_name] [nvarchar](50) NULL,
	[end_user] [nvarchar](50) NULL,
	[MOP] [nvarchar](50) NULL,
	[pre_Proc] [date] NULL,
	[ads_post_IAEB] [date] NULL,
	[Pre_bid] [date] NULL,
	[Eligibility_Check] [nvarchar](10) NULL,
	[oob] [date] NULL,
	[Bid_Eval] [date] NULL,
	[Notice_of_Award] [date] NULL,
	[Contract_Signing] [date] NULL,
	[Notice_To_Proceed] [date] NULL,
	[Del_Completion] [date] NULL,
	[Acceptance_date] [date] NULL,
	[Source_of_Funds] [nvarchar](50) NULL,
	[ABC] [money] NULL,
	[Contract_Cost] [money] NULL,
	[Invited_Observers] [nvarchar](50) NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[procurement_tbl2]    Script Date: 14/07/2017 4:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[procurement_tbl2](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code_PAP] [nvarchar](50) NULL,
	[pr_no] [nvarchar](50) NULL,
	[PO_JO] [nvarchar](50) NULL,
	[program_proj_name] [nvarchar](50) NULL,
	[end_user] [nvarchar](50) NULL,
	[MOP] [nvarchar](50) NULL,
	[pre_Proc] [date] NULL,
	[ads_post_IAEB] [date] NULL,
	[Pre_bid] [date] NULL,
	[Eligibility_Check] [nvarchar](10) NULL,
	[oob] [date] NULL,
	[Bid_Eval] [date] NULL,
	[Notice_of_Award] [date] NULL,
	[Contract_Signing] [date] NULL,
	[Notice_To_Proceed] [date] NULL,
	[Del_Completion] [date] NULL,
	[Acceptance_date] [date] NULL,
	[Source_of_Funds] [nvarchar](50) NULL,
	[ABC] [money] NULL,
	[ABC_MOOE] [money] NULL,
	[ABC_CO] [money] NULL,
	[ABC_Others] [money] NULL,
	[Contract_Cost] [money] NULL,
	[Contract_Cost_MOOE] [money] NULL,
	[Contract_Cost_CO] [money] NULL,
	[Contract_Cost_Others] [money] NULL,
	[Invited_Observers] [nvarchar](50) NULL,
	[DRP_Pre_Proc_conf] [nvarchar](50) NULL,
	[DRP_Pre_Bid_conf] [date] NULL,
	[DRP_Eligibility_check] [nvarchar](50) NULL,
	[DRP_OOP] [date] NULL,
	[DRP_Post_Qual] [date] NULL,
	[DRP_Notice_of_Award] [date] NULL,
	[DRP_Contract_Signing] [date] NULL,
	[DRP_Delivery_Accept] [date] NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[procurement_tbl3]    Script Date: 14/07/2017 4:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[procurement_tbl3](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code_PAP] [nvarchar](50) NULL,
	[pr_no] [nvarchar](50) NULL,
	[PO_JO] [nvarchar](50) NULL,
	[program_proj_name] [nvarchar](50) NULL,
	[end_user] [nvarchar](50) NULL,
	[MOP] [nvarchar](50) NULL,
	[pre_Proc] [date] NULL,
	[ads_post_IAEB] [date] NULL,
	[Pre_bid] [date] NULL,
	[Eligibility_Check] [nvarchar](10) NULL,
	[oob] [date] NULL,
	[Bid_Eval] [date] NULL,
	[Post_Qual] [nvarchar](10) NULL,
	[Notice_of_Award] [date] NULL,
	[Contract_Signing] [date] NULL,
	[Notice_To_Proceed] [date] NULL,
	[Del_Completion] [date] NULL,
	[Acceptance_date] [date] NULL,
	[Source_of_Funds] [nvarchar](50) NULL,
	[ABC] [money] NULL,
	[ABC_MOOE] [money] NULL,
	[ABC_CO] [money] NULL,
	[ABC_Others] [money] NULL,
	[Contract_Cost] [money] NULL,
	[Contract_Cost_MOOE] [money] NULL,
	[Contract_Cost_CO] [money] NULL,
	[Contract_Cost_Others] [money] NULL,
	[Invited_Observers] [nvarchar](50) NULL,
	[DRP_Pre_Proc_conf] [nvarchar](50) NULL,
	[DRP_Pre_Bid_conf] [date] NULL,
	[DRP_Eligibility_check] [nvarchar](50) NULL,
	[DRP_OOP] [date] NULL,
	[DRP_Post_Qual] [date] NULL,
	[DRP_Notice_of_Award] [date] NULL,
	[DRP_Contract_Signing] [date] NULL,
	[DRP_Delivery_Accept] [date] NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[procurement_tbl4]    Script Date: 14/07/2017 4:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[procurement_tbl4](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code_PAP] [nvarchar](50) NULL,
	[pr_no] [nvarchar](50) NULL,
	[PO_JO] [nvarchar](50) NULL,
	[program_proj_name] [nvarchar](50) NULL,
	[end_user] [nvarchar](50) NULL,
	[MOP] [nvarchar](50) NULL,
	[pre_Proc] [date] NULL,
	[ads_post_IAEB] [date] NULL,
	[Pre_bid] [date] NULL,
	[Eligibility_Check] [nvarchar](10) NULL,
	[oob] [date] NULL,
	[Bid_Eval] [date] NULL,
	[Post_Qual] [nvarchar](10) NULL,
	[Notice_of_Award] [date] NULL,
	[Contract_Signing] [date] NULL,
	[Notice_To_Proceed] [date] NULL,
	[Del_Completion] [date] NULL,
	[Acceptance_date] [date] NULL,
	[Source_of_Funds] [nvarchar](50) NULL,
	[ABC] [money] NULL,
	[ABC_MOOE] [money] NULL,
	[ABC_CO] [money] NULL,
	[ABC_Others] [money] NULL,
	[Contract_Cost] [money] NULL,
	[Contract_Cost_MOOE] [money] NULL,
	[Contract_Cost_CO] [money] NULL,
	[Contract_Cost_Others] [money] NULL,
	[Invited_Observers] [nvarchar](50) NULL,
	[DRP_Pre_Proc_conf] [nvarchar](50) NULL,
	[DRP_Pre_Bid_conf] [date] NULL,
	[DRP_Eligibility_check] [nvarchar](50) NULL,
	[DRP_OOP] [date] NULL,
	[DRP_Bid_Eval] [date] NULL,
	[DRP_Post_Qual] [date] NULL,
	[DRP_Notice_of_Award] [date] NULL,
	[DRP_Contract_Signing] [date] NULL,
	[DRP_Delivery_Accept] [date] NULL,
	[Remarks] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  StoredProcedure [dbo].[insert_procurement]    Script Date: 14/07/2017 4:28:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insert_procurement]
	-- Add the parameters for the stored procedure here
	@code_PAP  nvarchar(50)  ,
	@pr_no  nvarchar(50)  ,
	@PO_JO  nvarchar(50)  ,
	@program_proj_name  nvarchar(50)  ,
	@end_user  nvarchar(50)  ,
	@MOP  nvarchar(50)  ,
	@pre_Proc  date  ,
	@ads_post_IAEB  date  ,
	@Pre_bid  date  ,
	@Eligibility_Check  nvarchar(10)  ,
	@oob  date  ,
	@Bid_Eval  date  ,
	@Post_Qual  nvarchar(10)  ,
	@Notice_of_Award  date  ,
	@Contract_Signing  date  ,
	@Notice_To_Proceed  date  ,
	@Del_Completion  date  ,
	@Acceptance_date  date  ,
	@Source_of_Funds  nvarchar(50)  ,
	@ABC  decimal  ,
	@ABC_MOOE decimal  ,
	@ABC_CO decimal  ,
	@ABC_Others decimal  ,
	@Contract_Cost decimal  ,
	@Contract_Cost_MOOE decimal  ,
	@Contract_Cost_CO decimal  ,
	@Contract_Cost_Others decimal  ,
	@Invited_Observers  nvarchar(50)  ,
	@DRP_Pre_Proc_conf  nvarchar(50)  ,
	@DRP_Pre_Bid_conf  date ,
	@DRP_Eligibility_check  nvarchar(50)  ,
	@DRP_OOP  date  ,
	@DRP_Bid_Eval  date  ,
	@DRP_Post_Qual date  ,
	@DRP_Notice_of_Award  date  ,
	@DRP_Contract_Signing  date  ,
	@DRP_Delivery_Accept  date  ,
	@Remarks  nvarchar(50)  
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT into procurement_tbl4(
			code_PAP,
			pr_no,
			PO_JO,
			program_proj_name,
			end_user,
			MOP,
			pre_Proc,
			ads_post_IAEB,
			Pre_bid,
			Eligibility_Check,
			oob,
			Bid_Eval,
			Post_Qual,
			Notice_of_Award,
			Contract_Signing,
			Notice_To_Proceed,
			Del_Completion,
			Acceptance_date,
			Source_of_Funds,
			ABC,
			ABC_MOOE,
			ABC_CO,
			ABC_Others,
			Contract_Cost,
			Contract_Cost_MOOE,
			Contract_Cost_CO,
			Contract_Cost_Others,
			Invited_Observers,
			DRP_Pre_Proc_conf,
			DRP_Pre_Bid_conf,
			DRP_Eligibility_check,
			DRP_OOP,
			DRP_Bid_Eval,
			DRP_Post_Qual,
			DRP_Notice_of_Award,
			DRP_Contract_Signing,
			DRP_Delivery_Accept,
			Remarks)
	values(@code_PAP,
			@pr_no,
			@PO_JO,
			@program_proj_name,
			@end_user,
			@MOP,
			@pre_Proc,
			@ads_post_IAEB,
			@Pre_bid,
			@Eligibility_Check,
			@oob,
			@Bid_Eval,
			@Post_Qual,
			@Notice_of_Award,
			@Contract_Signing,
			@Notice_To_Proceed,
			@Del_Completion,
			@Acceptance_date,
			@Source_of_Funds,
			@ABC,
			@ABC_MOOE,
			@ABC_CO,
			@ABC_Others,
			@Contract_Cost,
			@Contract_Cost_MOOE,
			@Contract_Cost_CO,
			@Contract_Cost_Others,
			@Invited_Observers,
			@DRP_Pre_Proc_conf,
			@DRP_Pre_Bid_conf,
			@DRP_Eligibility_check,
			@DRP_OOP,
			@DRP_Bid_Eval,
			@DRP_Post_Qual,
			@DRP_Notice_of_Award,
			@DRP_Contract_Signing,
			@DRP_Delivery_Accept,
			@Remarks)
END

GO
USE [master]
GO
ALTER DATABASE [APP] SET  READ_WRITE 
GO
