# IBM Db2 for z/OS Developer Extension Change Log

## 2.2.4 - 2025/10/17
- Added support for IBM Db2 CI/CD Expert for z/OS.
- Added support for XML schemas in catalog navigation.
- Added support for calling stored procedures and user-defined functions for all supported languages from catalog navigation.
- Added support for explicit commit or rollback based on the impact of SQL changes through the use of a new "Run SQL Impact" context menu option in the editor tab.
- Added support for deploying stored procedures and user-defined functions for SQL language from catalog navigation.
- Added support for remote certification when tuning without a profile.
- Improved the view of DDL tab in catalog navigation to include line numbers.
- Improved the behavior of the SQL Results view in situations where the All option is enabled in the items per page dropdown for full data display.
- Fixed a situation in which tuning profile options were displayed in the tuning Connections view when the Tuning Services server option is set to NONE.
- Fixed an issue in which tuning profiles are not retrieved while attempting to tune with no tuning profile selected.
- Fixed an issue in which the Search functionality for the Package - Statement view and the UDF - Parameters view in catalog navigation was returning incorrect results.
- Resolved various security vulnerabilities.

## 2.2.3 - 2025/06/30
- Added support for canceling a long-running or unresponsive SQL process.
- Added support for using multi-factor authentication (MFA) to tune SQL queries without specifying a password.
- Added support for loading, saving, and resetting host variables for stored procedures and user-defined functions from the catalog view or from a file.
- Improved the results of running a stored procedure from the SQL editor by using a CALL statement by accurately classifying input and output parameters.
- Fixed the behavior of database connections that use security mechanism 18 so that users are no longer prompted for a password when using those connections.
- Fixed an issue in stored procedure deployment with duplicate handling.
- Fixed an issue in which the position of OUT variables was mapped incorrectly.
- Fixed an issue in which alternating between two connections prevented the use of special registers and global variables.
- Fixed an issue with displaying DDL for External SQL stored procedures during catalog navigation.
- Resolved various security vulnerabilities.

## 2.2.2 - 2025/05/23
- Fixed an issue with keytar that prevented Db2 Developer Extension 2.2.1 from opening from VS Code 1.100.
- Addressed an issue in which the user ID and password for a Db2 connection is not available when the connection is shared for the first time. When this situation occurs, you are now prompted to re-enter your user ID and password for that connection.

## 2.2.1 - 2025/04/04
- Added support for running and debugging user-defined functions (UDFs).
- Added support for deploying a combination of stored procedures and user-defined functions (UDFs) in a single operation.
- Added support for controlling processing behavior if an error occurs when multiple routines are deployed simultaneously.
- Added support for activating a new version of a native stored procedure or compiled UDF from catalog navigation.
- Added support for calling a native or external SQL stored procedure from catalog navigation.
- Added support for specifying package collection IDs when running tuning actions through the implementation of the currentPackagePath property.
- Documented a fix for truncated trailing zeros in the timestamp column of query results and table data.
- Improved table data editing by adding support for editing DISTINCT data types.
- Improved table data editing by including the length value in column headings.
- Fixed an issue that caused VS Code to open slowly.
- Fixed an issue in which incorrect data was exported when clicking Save results in the SQL Results view.
- Fixed an issue in which an errant error message was issued when the extension was opened.
- Resolved various security vulnerabilities.

## 2.2.0 - 2024/11/22
- Added support for deploying multiple stored procedures in a single operation.
- Added support for deploying user-defined functions.
- Added support for deploying SQLJ stored procedures.
- Added support for debugging Java and SQLJ stored procedures.
- Added support for table data editing.
- Added support for generating DDL for databases, tables, table spaces, indexes, and views.
- Added support for MFA, PassTicket in debugger, and tuning without a profile.
- Added support for filtering certain columns in catalog navigation by blank values for databases, plans, packages, stored procedures, triggers and user-defined functions.
- Improved performance of viewing catalog navigation objects.
- Improved Add/Edit connection view by enabling the Finish button when the password field is empty, which allows users to save changes without entering a password.
- Improved the Edit Connection view by allowing users to disassociate a tuning connection.
- Fixed an issue with the Connection view to ensure that newly created tuning profiles are associated with the correct Db2 connection when the user chooses to define this association.
- Fixed an issue with DDL truncation in DDL tab across catalog navigation.
- Fixed an issue with debugging a stored procedure in which an extra editor opens when debugging is restarted.
- Fixed an issue with filtering the catalog navigation plan in which filtering values with Match Any.
- Fixed an issue with importing Db2 connections from IBM Data Studio.
- Fixed an issue with deploying native stored procedure to use the configured target schema as current schema.
- Resolved various security vulnerabilities.

## 2.1.7 - 2024/07/31
- Fixed an issue with importing Db2 connections from IBM Data Studio.
- Fixed an issue that prevented users from running tuning actions after upgrading to Db2 Developer Extension 2.1.6.
- Fixed an issue that prevented users from using security mechanisms 7 and 9 when running tuning actions.

## 2.1.6 - 2024/06/28
- Added support for importing Db2 database connections from IBM Data Studio.
- Added support for debugging external stored procedures.
- Added support for creating a tuning profile from the Tuning tab when creating a Db2 connection.
- Added support for selecting multiple Java dependencies simultaneously when deploying Java stored procedures.
- Added support for filtering by all columns across catalog navigation.
- Added support for filtering by same column multiple times.
- Added support to display full text for LOB/CLOB data types.
- Improved performance of viewing catalog navigation objects.
- Fixed an issue with Running SQL where duplicate host variables were displayed multiple times.
- Fixed an issue with executing SQL in notebook editor where link was broken for scrollable element in SQL result output.
- Fixed an issue with executing SQL in notebook editor when the Notebook > Output: Text Line Limit setting is changed, the number of SQL result output lines doesn't change.
- Fixed an issue with native stored procedure where removing ASUTIME from routine options results in message not parsed.


## 2.1.5 - 2024/03/22
- Added support for deploying external SQL and Java stored procedures.
- Added support for executing SQL in notebook interface.
- Added support for viewing the extension in light color theme.
- Added support for filtering catalog navigation objects by all columns for databases, indexes, storage groups, stored procedures, and tables.
- Added support for displaying Java source and JAR dependencies of Java stored procedure catalog navigation objects.
- Added support for additional routine code snippets.
- Added support for displaying the Db2 subsystem location in the TUNING HISTORY view.
- Fixed an issue with connecting to Db2 connections using SSL client certificates where user ID and password were required.
- Fixed an issue with catalog navigation package objects for REST services not retrieving statements. 
- Fixed an issue with catalog navigation external SQL stored procedure objects not retrieving DDL.
- Fixed an issue with `!!` and `^=` not being formatted correctly.
- Formatted SQL statements shown in catalog navigation.
- Removed hard requirement for 64-bit Java JRE.
- Resolved various security vulnerabilities.
- Upgraded the IBM Data Server Driver for JDBC and SQLJ to version 4.32.28 to resolve Log4j vulnerability.

## 2.1.4 - 2023/12/08
- Added support for catalog navigation with global variables and REST services.
- Added support to not save the password for SQL Tuning Services servers.
- Fixed an issue for catalog navigation when browsing stored procedures with periods in the version.
- Fixed an issue for catalog navigation when browsing sequences for identity columns and implicitly created DOCID columns.
- Fixed an issue when a connection could not be retrieved when using catalog navigation after debugging a native stored procedure.
- Formatted DDL shown in catalog navigation.
- Enhanced error messages related to EXPLAIN tables when tuning SQL.
- Resolved various security vulnerabilities.

## 2.1.3 - 2023/10/13
- Fixed an incompatibility issue caused by the removal of the keytar shim in VS Code v1.83.0.
- Resolved a security vulnerability.

## 2.1.2 - 2023/09/29
- Added support for catalog navigation with aliases, sequences, table spaces, triggers, user-defined functions, and user-defined types.
- Added support for toggling between viewing and hiding implicit catalog navigation objects when applicable.
- Fixed an issue with the character conversion VS Code setting not being set.
- Fixed an issue with showing the correct error notification when a Visual Explain job fails and Chrome is not installed.
- Addressed various security vulnerabilities.

## 2.1.1 - 2023/06/23
- Added support for catalog navigation with indexes, packages, plans, stored procedures, and views.
- Added support for additional routine code snippets.
- Added support for displaying warnings on a result set in SQL results.
- Fixed an issue with Db2 13 systems being identified as Db2 12 systems.
- Fixed an issue when running SQL from the QUERY HISTORY view on macOS.
- Fixed an issue with setting lowercase current schema special register values in SQL run options.
- Fixed an issue for catalog navigation table objects with displaying the correct column length when the column type is `ROWID`.
- Fixed an issue for catalog navigation table objects where the `Data type` column was misspelled.
- Fixed an issue for catalog navigation schema objects where a schema with trailing blanks would fail to load.
- Enhanced error messages related to the language server.
- Addressed various security vulnerabilities.

## 2.1.0 - 2023/02/24
- Added support for catalog navigation with storage groups, databases, tables, and schemas.
- Added support for Access Path Advisor.
- Added support for Access Path Comparison.
- Added support for Index Advisor.
- Added support for Query Rewrite Advisor.
- Added support for SQL Annotator.
- Added support for handling invalid characters in result sets.
- Added support for refreshing the Tuning Connection Profiles view.
- Added partial support for VS Code Remote Development.
- Added a modal dialog to ask users for confirmation before sharing a tuning connection profile.
- Added VS Code version requirements to README.
- Improved SQL execution performance.
- Fixed an issue with loading the content when switching between different Visual Explain results.
- Fixed an issue when running SQL from the QUERY HISTORY view on Windows.
- Fixed an issue when debugging native stored procedures on Windows while connected to a VPN.
- Added an error notification to indicate when invalid ports are used for the Db2 SQL Service.
- Enhanced error messages related to Db2 SQL Service.
- Enhanced error messages related to SQL Tuning Services.
- Addressed various security vulnerabilities.

## 1.4.0 - 2022/05/30
- Added support for Db2 13 for z/OS SQL in syntax checking, syntax highlighting, formatting, code completion, and signature help.

## 1.3.5 - 2022/04/01
- Fixed an issue with using the extension on VS Code 1.66.

## 1.3.4 - 2022/03/15
- Added support for running SQL from the QUERY HISTORY view.
- Added support for activating the deployed native stored procedure version.
- Added support for JDBC properties up to JDBC driver version 4.29.24.
- Added links to SQL code explanations in the SQL Results view.
- Added a button to open an exported SQL result set in an editor.
- Enhanced the TUNING HISTORY view to show timestamps.
- Enhanced the security of Db2 connections by allowing the use of Windows trust store with the `sslTrustStoreType` JDBC property.
- Fixed `SYSPROC.ADMIN_COMMAND_DSN` signature help parameters.
- Addressed various security vulnerabilities.

## 1.3.3 - 2022/01/07
- Fixed Apache Log4j vulnerabilities CVE-2021-45046, CVE-2021-45105, and CVE-2021-44832.
- Updated SQL Tuning Services prerequisite in README to APAR PH42944, which includes Log4j vulnerability fixes.

## 1.3.2 - 2021/12/13
- Fixed Apache Log4j CVE-2021-44228 vulnerability.

## 1.3.1 - 2021/12/07
- Added support for tuning SQL that includes parameters and variables from within a native stored procedure (.spsql file).
- Added support for customizing SQL result set export options.
- Added support for filtering and sorting columns on the current page of SQL result set.
- Added support for previewing Visual Explain within Visual Studio Code.
- Moved the storage of Db2 connection and tuning server user credentials to the system's password manager.
- Enhanced the placeholder text and tooltip hints for EXPLAIN table action views.
- Enhanced the SQL results view to show the SQL statement in a code snippet and to show the results by default if the run was successful.
- Enhanced error messages for invalid context menu actions and unsupported JDBC drivers.
- Fixed an issue with hiding EXPLAIN table actions if the user is not an owner of the tuning profile.

## 1.3.0 - 2021/09/21
- Added support for defining tuning options.
- Added support for registering SQL Tuning Services servers.
- Added support for creating, editing, and deleting tuning connection profiles.
- Added support for creating, standardizing, and dropping EXPLAIN tables.
- Added support for running Visual Explain.
- Added support for running Statistics Advisor.
- Added support for running Capture Query Environment and saving the results to a file.
- Added support for sharing and revoking privileges for a tuning connection profile with other users.
- Added support for retaining the history of tuning actions.

## 1.2.0 - 2021/06/22
- Added a button to select a connection when no connection has been specified.
- Added formatting support to group and indent lines of related SQL code.
- Added new Execution Summary page that displays consolidated results from running multiple SQL statements.
- Added support for defining a hit count on breakpoints when using the debugger.
- Added support for sorting query history by the timestamp of the execution.
- Added support for running SQL that includes parameters and variables from within a native stored procedure (.spsql file).
- Added support for selecting multiple SQL elements on different lines and running those elements as a complete statement.
- Added support for restricting the number of rows in SQL result sets.
- Added support for null values, for retaining input values, and for suggestions in the host variable view.
- Added support for XML validation for host variable parameters input.
- Added support for launching the debugger when a password isn’t saved.
- Enhanced the Query History view to quickly identify and display failing SQL statements.
- Enhanced port setting support that allows you to specify a range of port numbers.
- Fixed an issue in which the connection was not being returned when the debugger terminates.

## 1.1.2 - 2021/03/24
- Changed the documentation link for the CREATE PROCEDURE snippet.
- Fixed an issue with using Drop duplicates to deploy a native stored procedure with a different signature.
- Fixed an issue with setting DISABLE DEBUG MODE when deploying a native stored procedure.
- Fixed an issue with using breakpoints inside a loop when debugging a native stored procedure.
- Fixed an issue with using the TIMESTAMP data type for parameters when debugging a native stored procedure.

## 1.1.1 - 2021/03/10
- Added support for using SQL run options when running or debugging native stored procedures.
- Fixed an issue with an SQL parser error against Db2 for z/OS V11 or Db2 12 function level 100 connections.
- Fixed an issue in which the debug mode setting was not saved in native stored procedure deploy options.
- Fixed an issue with the debugger terminating prematurely on some macOS systems.
- Fixed an issue with the debugger failing on the Restart action.

## 1.1.0 - 2021/02/23
- Added support for deploying, running, and debugging a native stored procedure.
- Added support for different commit and rollback options when running SQL.
- Added support for running selected SQL statements from any type of file.
- Renamed the configuration file that's used for running SQL options to `.db2devextconfig.json`.
- Relocated the Finish button to the bottom-left of configuration views.
- Fixed an issue where SQL results view title did not match the name of the file.

## 0.5.9 - 2021/02/03
- Fixed an issue with recognizing host variables that contain hyphens.
- Fixed an issue when requesting values of output host variables and indicator variables.

## 0.5.6 - 2020/12/10
- Fixed an issue with exporting SQL results data when reloading data.

## 0.5.5 - 2020/12/08
- Added two new tabs to the Connections view:
    - **Tracing**, which you use to enable and configure the JDBC driver trace.
    - **Optional**, which allows you to set JDBC properties.
- Added progress indicator for connecting to/disconnecting from Db2 and for running SQL.
- Improved how connections are automatically assigned to files.
- Eliminated the use of multiple views to display connection data and SQL results.
- Corrected relative links and updated the Add connection graphic in README.
- Fixed an issue with running an EXPLAIN statement on an explainable SQL statement.

## 0.5.1 - 2020/11/05
- Fixed character encoding for SQL results.

## 0.5.0 - 2020/10/27
- Added support for code completion and signature help for Db2 built-in functions and stored procedures.
- Added support to execute SQL.
- Added support for adding and managing connection profiles for Db2 subsystems.
- Added support for Db2 SQL syntax checking.
- Updated MERGE statement snippet.
- Updated routine statement snippets with `--#SET TERMINATOR` control statements.

## 0.1.1 - 2020/08/11
- Updated the structure of logs.

## 0.1.0 - 2020/07/28
Initial public release of IBM® Db2® for z/OS® Developer Extension.

- Syntax highlighting
- SQL snippets
